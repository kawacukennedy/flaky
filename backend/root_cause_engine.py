from typing import List
from backend.models import Run
import numpy as np

def analyze_root_cause(runs: List[Run]) -> str:
    """
    Analyzes a list of test runs to determine the root cause of flakiness.
    """
    if not runs:
        return "unknown"

    # Rule: Async Timing (high variance in duration for successful runs)
    successful_durations = [run.duration_ms for run in runs if run.status == 'pass']
    if len(successful_durations) > 1 and np.std(successful_durations) / np.mean(successful_durations) > 0.20:
        return "async_timing"

    # Rule: Randomness (different seeds -> inconsistent results)
    statuses_by_seed = {}
    for run in runs:
        if run.seed is not None:
            if run.seed not in statuses_by_seed:
                statuses_by_seed[run.seed] = set()
            statuses_by_seed[run.seed].add(run.status)
    
    if len(statuses_by_seed) > 1:
        # Check if any seed has both pass and fail outcomes
        for seed, statuses in statuses_by_seed.items():
            if len(statuses) > 1:
                return "randomness"

    # Rule: Order Dependency (fails when not first, passes when first)
    pass_when_first = any(run.status == 'pass' and run.order_position == 0 for run in runs)
    fail_when_not_first = any(run.status == 'fail' and run.order_position > 0 for run in runs)
    if pass_when_first and fail_when_not_first:
        return "order_dependency"

    # Rule: Resource Contention (fails with high CPU/mem)
    failed_runs = [run for run in runs if run.status == 'fail']
    passed_runs = [run for run in runs if run.status == 'pass']
    if failed_runs and passed_runs:
        avg_cpu_fail = np.mean([run.env_snapshot['cpu_load'] for run in failed_runs if run.env_snapshot])
        avg_cpu_pass = np.mean([run.env_snapshot['cpu_load'] for run in passed_runs if run.env_snapshot])
        if avg_cpu_fail > avg_cpu_pass * 1.5: # 50% higher CPU load on failure
            return "resource_contention"

    return "unknown"