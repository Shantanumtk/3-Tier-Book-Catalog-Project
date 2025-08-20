from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.services.book_service import BookService
from app.schemas import BookCreate, BookUpdate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/books")
def read_books(db: Session = Depends(get_db)):
    return BookService(db).list_books()

@router.post("/books")
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    return BookService(db).create(book)

@router.put("/books/{book_id}")
def update_book(book_id: int, book: BookUpdate, db: Session = Depends(get_db)):
    updated = BookService(db).update(book_id, book)
    if not updated:
        raise HTTPException(status_code=404, detail="Book not found")
    return updated

@router.delete("/books/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    success = BookService(db).delete(book_id)
    if not success:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"message": "Deleted"}
