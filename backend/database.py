from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base
import os

# Ensure DATABASE_URL is set in environment variables
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://user:password@localhost/flakyhunter_db')

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)