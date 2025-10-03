from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import schemas, models, crud
from ..database import SessionLocal
from ..ml_scorer import FlakinessPredictor
from ..root_cause_engine import RootCauseEngine
from ..websockets import manager
import asyncio

router = APIRouter(prefix="/plugins", tags=["plugins"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/tests", status_code=status.HTTP_200_OK)
async def ingest_plugin_data(
    payload: schemas.PluginTestPayload,
    db: Session = Depends(get_db)
):
    # 1. Validate payload (Pydantic schema handles this automatically)

    # 2. Get or create Project
    project = db.query(models.Project).filter(models.Project.name == payload.project_name).first()
    if not project:
        project = models.Project(name=payload.project_name)
        db.add(project)
        db.commit()
        db.refresh(project)

    # 3. Get or create Test
    test = db.query(models.Test).filter(models.Test.name == payload.test_name, models.Test.project_id == project.id).first()
    if not test:
        test = models.Test(name=payload.test_name, project_id=project.id)
        db.add(test)
        db.commit()
        db.refresh(test)

    # 4. Insert FlakyOccurrence
    flaky_occurrence = models.FlakyOccurrence(
        test_id=test.id,
        timestamp=payload.timestamp,
        status=payload.status,
        stack_trace=payload.stack_trace
    )
    db.add(flaky_occurrence)
    db.commit()
    db.refresh(flaky_occurrence)

    # 5. Trigger ML scorer (placeholder for actual ML integration)
    # flakiness_predictor = FlakinessPredictor()
    # flakiness_score = flakiness_predictor.predict(payload.to_dataframe())
    # Update test.flakiness_score in DB

    # 6. Trigger RootCauseEngine (placeholder)
    # if not payload.status: # if test failed, potentially flaky
    #     root_cause_engine = RootCauseEngine()
    #     causes = root_cause_engine.analyze([flaky_occurrence])
    #     # Store causes associated with flaky_occurrence or test

    # Broadcast update to frontend dashboards
    await manager.broadcast({
        "type": "new_flaky_occurrence",
        "data": {
            "test_id": test.id,
            "test_name": test.name,
            "project_name": project.name,
            "status": payload.status,
            "timestamp": payload.timestamp.isoformat()
        }
    })

    return {"message": "Test data ingested successfully", "test_id": test.id}