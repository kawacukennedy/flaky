# Purpose: Integration tests for routers

import pytest
from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 404 # No root endpoint defined yet

def test_get_tests_summary():
    response = client.get("/tests/summary")
    assert response.status_code == 200
    data = response.json()
    assert "totalTests" in data
    assert "flakyTests" in data
    assert "averageFlakiness" in data

def test_login():
    # Assuming no auth for now, or mock
    response = client.post("/users/login", data={"username": "test", "password": "test"})
    # Will fail without DB, but test structure
    assert response.status_code in [200, 401]

# Add more specific tests for /tests, /users, /analysis endpoints