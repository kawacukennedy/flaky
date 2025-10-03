# Purpose: Send Python test results to backend

import pytest
import requests
import os

FLAKYHUNTER_API_URL = os.getenv("FLAKYHUNTER_API_URL", "http://localhost:8000")

def pytest_runtest_makereport(item, call):
    if call.when == 'call':
        test_name = item.nodeid
        status = "pass" if call.excinfo is None else "fail"
        duration = call.duration

        payload = {
            "test_name": test_name,
            "status": status,
            "duration": duration,
            "env": {
                "python_version": os.sys.version,
                "platform": os.sys.platform,
            }
        }

        try:
            requests.post(f"{FLAKYHUNTER_API_URL}/tests", json=payload)
            print(f"[FlakyHunter] Sent test result for {test_name}")
        except requests.exceptions.ConnectionError as e:
            print(f"[FlakyHunter] Could not connect to API at {FLAKYHUNTER_API_URL}: {e}")
        except Exception as e:
            print(f"[FlakyHunter] Error sending test result: {e}")