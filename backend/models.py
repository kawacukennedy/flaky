from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base

class Project(Base):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, index=True)
    tests = relationship('Test', back_populates='project')

class Test(Base):
    __tablename__ = 'tests'
    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    project_id = Column(Integer, ForeignKey('projects.id'))
    status = Column(String, default="unknown") # Added status field
    flaky_occurrences = relationship('FlakyOccurrence', back_populates='test')
    project = relationship('Project', back_populates='tests')

class FlakyOccurrence(Base):
    __tablename__ = 'flake_occurrences'
    id = Column(Integer, primary_key=True)
    test_id = Column(Integer, ForeignKey('tests.id'))
    timestamp = Column(DateTime)
    status = Column(Boolean)
    stack_trace = Column(String, nullable=True)
    test = relationship('Test', back_populates='flaky_occurrences')

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password_hash = Column(String)
    is_admin = Column(Boolean, default=False)