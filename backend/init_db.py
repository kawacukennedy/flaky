#!/usr/bin/env python3
"""
Initialize the database with tables and initial data.
"""

from database import engine, Base
from models import Project, User
from sqlalchemy.orm import sessionmaker
import os

def init_db():
    # Create all tables
    Base.metadata.create_all(bind=engine)

    # Create a session
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()

    try:
        # Create default project if not exists
        default_project = db.query(Project).filter(Project.name == "default").first()
        if not default_project:
            default_project = Project(name="default", owner_id=None)  # Will set later
            db.add(default_project)
            db.commit()
            db.refresh(default_project)

        # Create admin user if not exists
        admin_user = db.query(User).filter(User.username == "admin").first()
        if not admin_user:
            from passlib.context import CryptContext
            pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
            hashed_password = pwd_context.hash("admin123")
            admin_user = User(
                username="admin",
                email="admin@example.com",
                password_hash=hashed_password,
                role="admin"
            )
            db.add(admin_user)
            db.commit()
            db.refresh(admin_user)

            # Set owner for default project
            default_project.owner_id = admin_user.id
            db.commit()

        print("Database initialized successfully.")

    except Exception as e:
        print(f"Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db()