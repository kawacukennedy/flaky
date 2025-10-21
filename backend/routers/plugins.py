from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from .. import schemas, models, crud
from ..database import SessionLocal
from ..ml_scorer import FlakinessPredictor
from ..root_cause_engine import RootCauseEngine
from ..websockets import manager
from ..services.plugin_service import PluginService
from ..services.notification_service import NotificationService
import asyncio
import time
from tenacity import retry, stop_after_attempt, wait_exponential

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
    try:
        # Validate payload using service
        plugin_service = PluginService()
        if not plugin_service.validate_payload(payload.dict()):
            raise HTTPException(status_code=400, detail="Invalid payload structure")

        # 1. Validate payload
        if not payload.test_name or not payload.project_id:
            raise HTTPException(status_code=400, detail="Invalid payload: missing required fields")

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

        # 5. Compute flakiness_score with fallback
        try:
            occurrences = db.query(models.FlakyOccurrence).filter(models.FlakyOccurrence.test_id == test.id).all()
            num_failures = len(occurrences)
            num_runs = num_failures * 2  # dummy approximation
            features = {
                'num_failures': num_failures,
                'num_runs': num_runs,
                'duration': payload.duration
            }
            predictor = FlakinessPredictor()
            flakiness_score = predictor.predict_flakiness(features)
        except Exception as e:
            print(f"ML scoring failed: {e}, using fallback")
            flakiness_score = 0.5  # fallback

        test.flakiness_score = flakiness_score
        db.commit()

        # 6. Root cause analysis if flaky (with error handling)
        if flakiness_score > 0.5:
            try:
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
            except Exception as e:
                print(f"Root cause analysis failed: {e}")

        # Send notification if highly flaky
        if flakiness_score > 0.8:
            notification_service = NotificationService()
            message = f"High flakiness detected: {test.name} in project {project.name} has score {flakiness_score}"
            notification_service.send_slack_message("#alerts", message)
            notification_service.send_email("admin@example.com", "Flaky Test Alert", message)

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

    except SQLAlchemyError as e:
        db.rollback()
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Database error")
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")