from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, models
from ..database import SessionLocal
from ..ml_scorer import FlakinessPredictor
from ..root_cause_engine import RootCauseEngine
import uuid

router = APIRouter(prefix="/analysis", tags=["analysis"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/predict", response_model=schemas.AnalysisPredictResponse)
def predict_flakiness(payload: schemas.AnalysisPredictPayload, db: Session = Depends(get_db)):
    predictor = FlakinessPredictor()
    # Process execution_data
    # For simplicity, take first item
    data = payload.execution_data[0] if payload.execution_data else {}
    features = {
        'num_failures': data.get('num_failures', 0),
        'num_runs': data.get('num_runs', 1),
        'duration': data.get('duration', 0)
    }
    score = predictor.predict_flakiness(features)
    return {
        "test_id": data.get('test_id', str(uuid.uuid4())),
        "flakiness_score": score,
        "probability": score,  # dummy
        "features_used": list(features.keys())
    }

@router.get("/root_cause/{test_id}", response_model=schemas.RootCauseResponse)
def get_root_cause(test_id: str, db: Session = Depends(get_db)):
    try:
        test_uuid = uuid.UUID(test_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid test_id")

    test = db.query(models.Test).filter(models.Test.id == test_uuid).first()
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")

    engine = RootCauseEngine()
    causes = engine.analyze_flakiness(test_id, db)
    return {"test_id": test_id, "root_causes": causes}