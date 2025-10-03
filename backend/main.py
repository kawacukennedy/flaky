from fastapi import FastAPI, Depends
from pydantic import BaseModel, Field
from typing import List
from uuid import UUID, uuid4
import datetime
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from backend.database import create_db_and_tables, get_session
from backend.models import Test, Run
from backend.ml_scorer import calculate_flakiness_score
from backend.root_cause_engine import analyze_root_cause

app = FastAPI(title="FlakeHunter", version="1.0.0")

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

class EnvSnapshot(BaseModel):
    os: str
    language_version: str
    deps_hash: str
    cpu_load: float
    memory_mb: int

class RunUpload(BaseModel):
    run_id: UUID
    status: str
    duration_ms: int
    timestamp: datetime.datetime
    stdout: str
    stderr: str
    stacktrace: str
    seed: int
    order_position: int
    env_snapshot: EnvSnapshot

class TestUpload(BaseModel):
    test_id: str
    framework: str
    commit_sha: str
    runs: List[RunUpload]

class UploadResponse(BaseModel):
    upload_id: UUID
    queued: bool

@app.post("/upload", response_model=UploadResponse)
def upload_test_bundle(payload: TestUpload, session: Session = Depends(get_session)):
    # Check if test already exists
    statement = select(Test).where(Test.test_id_str == payload.test_id)
    test = session.exec(statement).first()

    if not test:
        test = Test(test_id_str=payload.test_id, framework=payload.framework)
        session.add(test)
        session.commit()
        session.refresh(test)

    for run_data in payload.runs:
        run = Run(**run_data.dict(), test_id=test.id)
        session.add(run)
    
    session.commit()

    # Re-fetch all runs for this test to perform analysis
    statement = select(Run).where(Run.test_id == test.id)
    all_runs = session.exec(statement).all()

    test.flakiness_score = calculate_flakiness_score(all_runs)
    test.root_cause = analyze_root_cause(all_runs)
    session.add(test)
    session.commit()

    return {"upload_id": uuid4(), "queued": True}


class RunHistory(BaseModel):
    run_id: UUID
    status: str
    duration_ms: int
    timestamp: datetime.datetime

class TestDetailResponse(BaseModel):
    test_id: str
    framework: str
    flakiness_score: float
    root_cause: str
    suggested_fix: str
    history: List[RunHistory]

@app.get("/tests/{test_id_str}", response_model=TestDetailResponse)
def get_test_details(test_id_str: str, session: Session = Depends(get_session)):
    statement = select(Test).where(Test.test_id_str == test_id_str)
    test = session.exec(statement).first()
    if not test:
        return {"error": "Test not found"} # Or raise HTTPException

    # Sort runs by timestamp
    history = sorted(test.runs, key=lambda r: r.timestamp)

    return {
        "test_id": test.test_id_str,
        "framework": test.framework,
        "flakiness_score": test.flakiness_score,
        "root_cause": test.root_cause,
        "suggested_fix": test.suggested_fix or "No suggestion available.",
        "history": history,
    }

class DashboardResponse(BaseModel):
    total_tests: int
    flaky_tests: int
    flakiness_rate: float
    severity_distribution: dict
    top_flaky_tests: List[dict]

@app.get("/dashboard", response_model=DashboardResponse)
def get_dashboard_data(session: Session = Depends(get_session)):
    total_tests = session.exec(select(Test)).all()
    flaky_tests = [t for t in total_tests if t.flakiness_score > 0.5]
    
    top_flaky = sorted(flaky_tests, key=lambda t: t.flakiness_score, reverse=True)[:5]

    return {
        "total_tests": len(total_tests),
        "flaky_tests": len(flaky_tests),
        "flakiness_rate": len(flaky_tests) / len(total_tests) if total_tests else 0,
        "severity_distribution": {
            "critical": len([t for t in flaky_tests if t.flakiness_score > 0.9]),
            "moderate": len([t for t in flaky_tests if 0.7 < t.flakiness_score <= 0.9]),
            "minor": len([t for t in flaky_tests if 0.5 < t.flakiness_score <= 0.7]),
        },
        "top_flaky_tests": [
            {"test_id": t.test_id_str, "flakiness_score": t.flakiness_score, "root_cause": t.root_cause}
            for t in top_flaky
        ]
    }

@app.get("/")
async def read_root():
    return {"message": "Welcome to FlakeHunter API"}
