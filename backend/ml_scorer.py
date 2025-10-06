import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import numpy as np
from typing import Dict, Any, List
import time
from functools import lru_cache

class FlakinessPredictor:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.cache = {}
        # Placeholder for trained model, in real app load from file

    def predict_flakiness(self, features: Dict[str, Any]) -> float:
        """
        Predict flakiness score based on features
        """
        try:
            # Simple feature engineering
            X = pd.DataFrame([features])
            # Assume features include: duration, num_failures, num_runs, etc.
            # For now, use simple heuristic
            if 'num_failures' in features and 'num_runs' in features:
                score = features['num_failures'] / features['num_runs'] if features['num_runs'] > 0 else 0
            else:
                score = 0.5  # default
            return min(max(score, 0.0), 1.0)
        except Exception as e:
            print(f"Error in predict_flakiness: {e}")
            return 0.5  # fallback

    def update_model(self, new_data: pd.DataFrame):
        """
        Update the ML model with new training data
        """
        try:
            # Train on new data
            # Assume new_data has features and target flakiness_score
            if 'flakiness_score' in new_data.columns and len(new_data) > 0:
                X = new_data.drop('flakiness_score', axis=1)
                y = new_data['flakiness_score']
                self.model.fit(X, y)
                print(f"Model updated with {len(new_data)} samples")
            else:
                print("No valid data for model update")
        except Exception as e:
            print(f"Error updating model: {e}")

    def cache_results(self, ttl: int):
        """
        Cache prediction results with TTL
        """
        # Simple in-memory cache with TTL
        current_time = time.time()
        # Clean expired entries
        expired_keys = [k for k, v in self.cache.items() if current_time - v['timestamp'] > ttl]
        for k in expired_keys:
            del self.cache[k]

    def _get_cache_key(self, features: Dict[str, Any]) -> str:
        """Generate cache key from features"""
        return str(sorted(features.items()))