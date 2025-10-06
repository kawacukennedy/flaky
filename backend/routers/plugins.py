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
    # 1. Validate payload

    # 2. Get Project
    project = db.query(models.Project).filter(models.Project.id == payload.project_id).first()
    if not project:
        raise HTTPException(status_code=400, detail="Invalid project_id")

    # 3. Get or create Test
    test = db.query(models.Test).filter(models.Test.name == payload.test_name, models.Test.project_id == project.id).first()
    if not test:
        test = models.Test(
            name=payload.test_name,
            project_id=project.id,
            status=payload.status,
            duration=payload.duration,
            environment=payload.environment,
            timestamp=payload.timestamp,
            flakiness_score=0.0
        )
        db.add(test)
        db.commit()
        db.refresh(test)
    else:
        # Update test fields
        test.status = payload.status
        test.duration = payload.duration
        test.environment = payload.environment
        test.timestamp = payload.timestamp
        db.commit()

    # 4. Insert FlakyOccurrence if failed
    if payload.status == schemas.StatusEnum.FAIL:
        flaky_occurrence = models.FlakyOccurrence(
            test_id=test.id,
            timestamp=payload.timestamp,
            failure_reason=""  # TODO: get from payload or logs
        )
        db.add(flaky_occurrence)
        db.commit()

    # 5. Compute flakiness_score
    # Get num_failures and num_runs
    occurrences = db.query(models.FlakyOccurrence).filter(models.FlakyOccurrence.test_id == test.id).all()
    num_failures = len(occurrences)
    # Assume num_runs is number of times test was run, for simplicity num_failures + passes
    # But since we don't have passes, approximate
    num_runs = num_failures * 2  # dummy
    features = {
        'num_failures': num_failures,
        'num_runs': num_runs,
        'duration': payload.duration
    }
    predictor = FlakinessPredictor()
    flakiness_score = predictor.predict_flakiness(features)
    test.flakiness_score = flakiness_score
    db.commit()

    # 6. Root cause analysis if flaky
    if flakiness_score > 0.5:
        engine = RootCauseEngine()
        causes = engine.analyze_flakiness(str(test.id), db)
        for cause in causes:
            root_cause = models.RootCauseAnalysis(
                test_id=test.id,
                type=cause['type'],
                description=cause['description'],
                severity=cause['severity'],
                confidence=cause['confidence']
            )
            db.add(root_cause)
        db.commit()

    # Broadcast update
    await manager.broadcast({
        "type": "new_test_run",
        "data": {
            "test_id": str(test.id),
            "test_name": test.name,
            "project_name": project.name,
            "status": payload.status.value,
            "flakiness_score": flakiness_score,
            "timestamp": payload.timestamp.isoformat()
        }
    })

    return {
        "test_id": str(test.id),
        "flakiness_score": flakiness_score,
        "timestamp": payload.timestamp.isoformat()
    }