from sqlalchemy import Column, String, Float, ForeignKey, DateTime, Integer
from sqlalchemy.dialects.postgresql import UUID, ENUM
from sqlalchemy.orm import relationship
import uuid
from enum import Enum as PyEnum
from .database import Base

class StatusEnum(PyEnum):
    PASS = "pass"
    FAIL = "fail"
    SKIPPED = "skipped"

class RoleEnum(PyEnum):
    USER = "user"
    ADMIN = "admin"

class Project(Base):
    __tablename__ = 'projects'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, index=True)
    owner_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    tests = relationship('Test', back_populates='project')
    owner = relationship('User', back_populates='projects')

class Test(Base):
    __tablename__ = 'tests'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, index=True)
    status = Column(ENUM(StatusEnum), default=StatusEnum.PASS)
    duration = Column(Float)
    environment = Column(String)
    project_id = Column(UUID(as_uuid=True), ForeignKey('projects.id'))
    timestamp = Column(DateTime)
    flakiness_score = Column(Float, default=0.0)
    flaky_occurrences = relationship('FlakyOccurrence', back_populates='test')
    root_cause_analyses = relationship('RootCauseAnalysis', back_populates='test')
    project = relationship('Project', back_populates='tests')

class FlakyOccurrence(Base):
    __tablename__ = 'flaky_occurrences'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    test_id = Column(UUID(as_uuid=True), ForeignKey('tests.id'))
    timestamp = Column(DateTime)
    failure_reason = Column(String)
    test = relationship('Test', back_populates='flaky_occurrences')

class User(Base):
    __tablename__ = 'users'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password_hash = Column(String)
    role = Column(ENUM(RoleEnum), default="user")
    projects = relationship('Project', back_populates='owner')

class RootCauseAnalysis(Base):
    __tablename__ = 'root_cause_analyses'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    test_id = Column(UUID(as_uuid=True), ForeignKey('tests.id'))
    type = Column(String)
    description = Column(String)
    severity = Column(Integer)
    confidence = Column(Float)
    test = relationship('Test', back_populates='root_cause_analyses')