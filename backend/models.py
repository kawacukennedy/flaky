from typing import List, Optional
from sqlmodel import Field, SQLModel, Relationship
from uuid import UUID, uuid4
import datetime

class Test(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    test_id_str: str = Field(unique=True, index=True) # The string ID like 'test_login'
    framework: str = Field(max_length=20)
    flakiness_score: float = Field(default=0.0, ge=0, le=1)
    root_cause: Optional[str] = Field(default=None, max_length=50)
    suggested_fix: Optional[str] = Field(default=None)
    runs: List["Run"] = Relationship(back_populates="test")

class Run(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    test_id: UUID = Field(foreign_key="test.id")
    status: str = Field(max_length=10)
    duration_ms: int
    timestamp: datetime.datetime
    stacktrace: Optional[str] = Field(default=None)
    stdout: Optional[str] = Field(default=None)
    stderr: Optional[str] = Field(default=None)
    seed: Optional[int] = Field(default=None)
    order_position: Optional[int] = Field(default=None)
    test: "Test" = Relationship(back_populates="runs")

