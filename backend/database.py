from sqlmodel import create_engine, SQLModel, Session
import os

# The DATABASE_URL is read from the environment variables
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/flakehunterdb")

engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session

def create_db_and_tables():
    # This function will now create tables if they don't exist, without dropping them.
    # In a real production app, you'd use Alembic for migrations.
    SQLModel.metadata.create_all(engine)
