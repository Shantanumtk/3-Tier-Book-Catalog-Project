import os
from dotenv import load_dotenv

# Load env vars from backend/.env
load_dotenv()

POSTGRES_USER = os.getenv("POSTGRES_USER", "")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "")
POSTGRES_DB = os.getenv("POSTGRES_DB", "")
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")  # use 'db' when in docker-compose
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")

# Final SQLAlchemy URL (psycopg2 driver)
DATABASE_URL = (
    f"postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}"
    f"@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
)
