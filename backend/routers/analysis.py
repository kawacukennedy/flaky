from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, models
from ..database import SessionLocal
from ..ml_scorer import FlakinessPredictor
from ..root_cause_engine import RootCauseEngine
import pandas as pd

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/predict")
def predict_flakiness(execution_data: dict):
    # In a real scenario, execution_data would be a Pydantic model
    # and would be preprocessed into a DataFrame for the ML model.
    # For now, a placeholder.
    predictor = FlakinessPredictor()
    # Example: X = pd.DataFrame([execution_data])
    # prediction = predictor.predict(X)
    return {"prediction": "flaky"} # Placeholder

@router.get("/root_cause/{test_id}")
def get_root_cause(test_id: int, db: Session = Depends(get_db)):
    test_occurrences = db.query(models.FlakyOccurrence).filter(models.FlakyOccurrence.test_id == test_id).all()
    if not test_occurrences:
        raise HTTPException(status_code=404, detail="No flaky occurrences found for this test")

    engine = RootCauseEngine()
    causes = engine.analyze(test_occurrences)
    return {"test_id": test_id, "root_causes": causes} # Placeholder