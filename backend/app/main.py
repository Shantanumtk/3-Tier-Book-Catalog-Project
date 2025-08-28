from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers.book_controller import router
from app.database import Base, engine
from app.models import Book  # ensure model metadata is imported

app = FastAPI()
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_credentials=True,
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
