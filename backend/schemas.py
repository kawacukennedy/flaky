from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from enum import Enum as PyEnum

class StatusEnum(PyEnum):
    PASS = "pass"
    FAIL = "fail"
    SKIPPED = "skipped"

class RoleEnum(PyEnum):
    USER = "user"
    ADMIN = "admin"

class TestBase(BaseModel):
    name: str
    project_id: str  # UUID as str

class TestCreate(TestBase):
    pass

class TestResponse(TestBase):
    id: str
    status: StatusEnum
    duration: Optional[float]
    environment: Optional[str]
    timestamp: datetime
    flakiness_score: float
    class Config:
        orm_mode = True

class FlakyOccurrenceSchema(BaseModel):
    test_id: str
    timestamp: datetime
    failure_reason: str
    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    username: str
    email: EmailStr
    role: RoleEnum
    class Config:
        orm_mode = True

class PluginTestPayload(BaseModel):
    test_name: str
    status: StatusEnum
    duration: float
    environment: str
    project_id: str  # UUID
    timestamp: datetime

class AnalysisPredictPayload(BaseModel):
    execution_data: list[dict]  # array of test results

class AnalysisPredictResponse(BaseModel):
    test_id: str
    flakiness_score: float
    probability: float
    features_used: list[str]

class RootCauseResponse(BaseModel):
    test_id: str
    root_causes: list[dict]  # type, description, severity, confidence

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse