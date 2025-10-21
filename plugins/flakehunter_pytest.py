import requests
import os
from datetime import datetime

class FlakeHunterPlugin:
    def __init__(self):
        self.api_url = os.getenv('FLAKEHUNTER_API_URL', 'http://localhost:8000')
        self.project_id = os.getenv('FLAKEHUNTER_PROJECT_ID')

    def pytest_runtest_logreport(self, report):
        if report.when == 'call':
            payload = {
                "test_name": report.nodeid,
                "status": "pass" if report.passed else "fail",
                "duration": report.duration,
                "environment": os.getenv('ENVIRONMENT', 'local'),
                "project_id": self.project_id,
                "timestamp": datetime.utcnow().isoformat()
            }
            try:
                response = requests.post(f"{self.api_url}/plugins/tests", json=payload)
                response.raise_for_status()
            except requests.RequestException as e:
                print(f"Failed to send test data: {e}")

# To use: add to pytest plugins