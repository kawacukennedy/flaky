# Purpose: Unit tests for ML scoring

import pytest
import pandas as pd
from ..ml_scorer import FlakinessPredictor

def test_flakiness_predictor_train_predict():
    predictor = FlakinessPredictor()
    X_train = pd.DataFrame({'feature1': [1, 2, 3, 4, 5], 'feature2': [5, 4, 3, 2, 1]})
    y_train = pd.Series([0, 1, 0, 1, 0])
    predictor.train(X_train, y_train)

    X_test = pd.DataFrame({'feature1': [1, 2], 'feature2': [5, 4]})
    predictions = predictor.predict(X_test)
    assert len(predictions) == 2

    probabilities = predictor.predict_proba(X_test)
    assert probabilities.shape == (2, 2)