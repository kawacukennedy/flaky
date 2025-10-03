from sqlalchemy.orm import Session
from .models import Test, FlakyOccurrence, Project, User

class ProjectCRUD:
    @staticmethod
    def create(db: Session, data: dict):
        obj = Project(**data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj

    @staticmethod
    def get_by_name(db: Session, name: str):
        return db.query(Project).filter(Project.name == name).first()

class TestCRUD:
    @staticmethod
    def create(db: Session, data: dict):
        obj = Test(**data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj

    @staticmethod
    def get_by_name_and_project(db: Session, name: str, project_id: int):
        return db.query(Test).filter(Test.name == name, Test.project_id == project_id).first()

    @staticmethod
    def list(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Test).offset(skip).limit(limit).all()

class FlakyOccurrenceCRUD:
    @staticmethod
    def create(db: Session, data: dict):
        obj = FlakyOccurrence(**data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj