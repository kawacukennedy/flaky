from typing import List
from backend.models import Run
import numpy as np
import datetime

def calculate_flakiness_score(runs: List[Run]) -> float:
    """
    Calculates a more advanced flakiness score based on a list of test runs.
    """
    if not runs or len(runs) < 2:
        return 0.0

    # Factor 1: Basic failure rate
    fails = sum(1 for run in runs if run.status == 'fail')
    failure_rate = fails / len(runs)

    if failure_rate == 0.0:
        return 0.0

    # Factor 2: Weight failures with stack traces more heavily
    failures_with_stacktrace = sum(1 for run in runs if run.status == 'fail' and run.stacktrace)
    stacktrace_weight = 1.5 if failures_with_stacktrace > 0 else 1.0

    # Factor 3: Duration variance of successful runs
    successful_durations = [run.duration_ms for run in runs if run.status == 'pass']
    duration_cv = 0.0
    if len(successful_durations) > 1:
        mean_duration = np.mean(successful_durations)
        std_duration = np.std(successful_durations)
        if mean_duration > 0:
            duration_cv = std_duration / mean_duration
    
    # Factor 4: Time decay - recent failures are more important
    now = datetime.datetime.now(datetime.timezone.utc)
    most_recent_fail_days_ago = 1e9
    for run in runs:
        if run.status == 'fail':
            days_ago = (now - run.timestamp).days
            if days_ago < most_recent_fail_days_ago:
                most_recent_fail_days_ago = days_ago
    
    time_decay_factor = 1 / (1 + most_recent_fail_days_ago * 0.1) # Higher for more recent failures

    # Combine factors into a final score
    # This is a heuristic combination and can be tuned
    base_score = failure_rate * stacktrace_weight
    variance_penalty = duration_cv * 0.2 # Add a penalty for high variance
    
    final_score = base_score + variance_penalty
    final_score *= time_decay_factor

    return min(final_score, 1.0) # Cap the score at 1.0