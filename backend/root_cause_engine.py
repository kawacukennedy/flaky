from typing import List, Dict
import time

class RootCauseEngine:
    def __init__(self):
        self.cache = {}

    def analyze_flakiness(self, test_id: str, db_session) -> List[Dict]:
        """
        Analyze root causes of flakiness for a test
        """
        try:
            # Query last N runs (simplified)
            # In real implementation, query FlakyOccurrences and analyze patterns
            from .models import FlakyOccurrence, Test
            test = db_session.query(Test).filter(Test.id == test_id).first()
            if not test:
                return []

            occurrences = db_session.query(FlakyOccurrence).filter(FlakyOccurrence.test_id == test_id).all()

            causes = []

            # Simple analysis based on failure patterns
            if len(occurrences) > 5:
                causes.append({
                    "type": "high_failure_rate",
                    "description": f"Test has {len(occurrences)} failures, indicating high flakiness",
                    "severity": 4,
                    "confidence": 0.9
                })

            # Check for timing issues (simplified)
            if test.duration and test.duration > 10:  # arbitrary threshold
                causes.append({
                    "type": "timing",
                    "description": "Test duration suggests potential timing issues",
                    "severity": 3,
                    "confidence": 0.7
                })

            # Environment issues
            if len(set([occ.environment for occ in occurrences if occ.environment])) > 1:
                causes.append({
                    "type": "environment",
                    "description": "Failures occur across multiple environments",
                    "severity": 2,
                    "confidence": 0.8
                })

            return causes

        except Exception as e:
            print(f"Error in analyze_flakiness: {e}")
            return []

    def cache_results(self, ttl: int):
        """
        Cache analysis results with TTL
        """
        current_time = time.time()
        # Clean expired entries
        expired_keys = [k for k, v in self.cache.items() if current_time - v['timestamp'] > ttl]
        for k in expired_keys:
            del self.cache[k]