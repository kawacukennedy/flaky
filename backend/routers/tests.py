from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, models
from ..database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.TestResponse])
def read_tests(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tests = crud.TestCRUD.list(db, skip=skip, limit=limit)
    return tests

@router.post("/", response_model=schemas.TestResponse)
def create_test(test: schemas.TestCreate, db: Session = Depends(get_db)):
    db_test = crud.TestCRUD.create(db, data=test.dict())
    return db_test

@router.get("/{test_id}", response_model=schemas.TestResponse)
def read_test(test_id: int, db: Session = Depends(get_db)):
    test = db.query(models.Test).filter(models.Test.id == test_id).first()
    if test is None:
        raise HTTPException(status_code=404, detail="Test not found")
    return test

@router.put("/{test_id}", response_model=schemas.TestResponse)
def update_test(test_id: int, test_update: schemas.TestCreate, db: Session = Depends(get_db)):
    db_test = db.query(models.Test).filter(models.Test.id == test_id).first()
    if db_test is None:
        raise HTTPException(status_code=404, detail="Test not found")
    for key, value in test_update.dict().items():
        setattr(db_test, key, value)
    db.commit()
    db.refresh(db_test)
    return db_test

@router.delete("/{test_id}")
def delete_test(test_id: int, db: Session = Depends(get_db)):
    db_test = db.query(models.Test).filter(models.Test.id == test_id).first()
    if db_test is None:
        raise HTTPException(status_code=404, detail="Test not found")
    db.delete(db_test)
    db.commit()
    return {"message": "Test deleted successfully"}