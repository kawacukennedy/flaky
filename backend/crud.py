from sqlalchemy.orm import Session
from .models import Test, FlakyOccurrence, Project, User

class TestCRUD:
    @staticmethod
    def create(db: Session, data: dict):
        obj = Test(**data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj

    @staticmethod
    def list(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Test).offset(skip).limit(limit).all()