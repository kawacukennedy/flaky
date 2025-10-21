# Purpose: Send Python test results to backend

import pytest
import requests
import os
import sys

FLAKYHUNTER_API_URL = os.getenv("FLAKYHUNTER_API_URL", "http://localhost:8000")

def pytest_runtest_makereport(item, call):
    if call.when == 'call':
        test_name = item.nodeid
        status = "pass" if call.excinfo is None else "fail"
        duration = call.duration

        from datetime import datetime
        payload = {
            "test_name": test_name,
            "status": status,
            "duration": duration,
            "environment": f"python-{sys.version.split()[0]}-{sys.platform}",
            "project_id": os.getenv("FLAKYHUNTER_PROJECT_ID", "default-project"),  # TODO: get from config
            "timestamp": datetime.utcnow().isoformat()
        }

        try:
            requests.post(f"{FLAKYHUNTER_API_URL}/plugins/tests", json=payload)
            print(f"[FlakyHunter] Sent test result for {test_name}")
        except requests.exceptions.ConnectionError as e:
            print(f"[FlakyHunter] Could not connect to API at {FLAKYHUNTER_API_URL}: {e}")
        except Exception as e:
            print(f"[FlakyHunter] Error sending test result: {e}")