from pydantic import BaseModel, EmailStr
from datetime import datetime

class TestBase(BaseModel):
    name: str
    project_id: int

class TestCreate(TestBase):
    pass

class TestResponse(TestBase):
    id: int
    class Config:
        orm_mode = True

class FlakyOccurrenceSchema(BaseModel):
    test_id: int
    timestamp: datetime
    status: bool
    stack_trace: str | None
    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_admin: bool
    class Config:
        orm_mode = True

class PluginTestPayload(BaseModel):
    test_name: str
    project_name: str
    status: bool
    duration: float | None = None
    environment: dict | None = None
    timestamp: datetime
    stack_trace: str | None = None