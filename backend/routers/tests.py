from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from .. import crud, schemas, models
from ..database import SessionLocal
from ..websockets import manager # Import the WebSocket manager
import asyncio

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.TestResponse])
def read_tests(
    skip: int = 0,
    limit: int = 100,
    search: str | None = Query(None, description="Search term for test names"),
    status: str | None = Query(None, description="Filter by test status"),
    project: str | None = Query(None, description="Filter by project name"),
    db: Session = Depends(get_db)
):
    query = db.query(models.Test)

    if search:
        query = query.filter(models.Test.name.ilike(f"%{search}%"))

    if status:
        query = query.filter(models.Test.status == status)

    if project:
        query = query.join(models.Project).filter(models.Project.name.ilike(f"%{project}%"))

    tests = query.offset(skip).limit(limit).all()
    return tests

@router.post("/", response_model=schemas.TestResponse)
async def create_test(test: schemas.TestCreate, db: Session = Depends(get_db)):
    db_test = crud.TestCRUD.create(db, data=test.dict())
    # Broadcast the new test to connected WebSocket clients
    await manager.broadcast({"type": "new_test", "data": schemas.TestResponse.from_orm(db_test).dict()})
    return db_test

@router.get("/{test_id}", response_model=schemas.TestResponse)
def read_test(test_id: str, db: Session = Depends(get_db)):
    test = db.query(models.Test).filter(models.Test.id == test_id).first()
    if test is None:
        raise HTTPException(status_code=404, detail="Test not found")
    return test

@router.get("/{test_id}/logs")
def get_test_logs(test_id: str, db: Session = Depends(get_db)):
    # In a real scenario, logs would be stored in a dedicated logging system or as part of FlakyOccurrence
    # For now, we'll return dummy logs associated with flaky occurrences
    occurrences = db.query(models.FlakyOccurrence).filter(models.FlakyOccurrence.test_id == test_id).all()
    logs = []
    for occ in occurrences:
        logs.append(f"[{occ.timestamp.isoformat()}] Failure Reason: {occ.failure_reason or 'N/A'}")
    
    if not logs:
        logs = ["No logs available"]
    
    return {"test_id": test_id, "logs": logs}

@router.put("/{test_id}", response_model=schemas.TestResponse)
async def update_test(test_id: str, test_update: schemas.TestCreate, db: Session = Depends(get_db)):
    db_test = db.query(models.Test).filter(models.Test.id == test_id).first()
    if db_test is None:
        raise HTTPException(status_code=404, detail="Test not found")
    for key, value in test_update.dict().items():
        setattr(db_test, key, value)
    db.commit()
    db.refresh(db_test)
    await manager.broadcast({"type": "update_test", "data": schemas.TestResponse.from_orm(db_test).dict()})
    return db_test

@router.delete("/{test_id}")
async def delete_test(test_id: str, db: Session = Depends(get_db)):
    db_test = db.query(models.Test).filter(models.Test.id == test_id).first()
    if db_test is None:
        raise HTTPException(status_code=404, detail="Test not found")
    db.delete(db_test)
    db.commit()
    await manager.broadcast({"type": "delete_test", "data": {"id": test_id}})
    return {"message": "Test deleted successfully"}

@router.get("/summary")
def get_tests_summary(db: Session = Depends(get_db)):
    total_tests = db.query(models.Test).count()
    flaky_tests = db.query(models.Test).filter(models.Test.flakiness_score > 0.5).count()
    average_flakiness = db.query(models.Test).with_entities(db.func.avg(models.Test.flakiness_score)).scalar() or 0.0
    return {
        "totalTests": total_tests,
        "flakyTests": flaky_tests,
        "averageFlakiness": average_flakiness
    }