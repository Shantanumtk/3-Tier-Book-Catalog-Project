from sqlalchemy.orm import Session
from app.repositories.book_repository import BookRepository
from app.models import Book
from app.schemas import BookCreate, BookUpdate

class BookService:
    def __init__(self, db: Session):
        self.repo = BookRepository(db)

    def list_books(self):
        return self.repo.get_all_books()

    def create(self, data: BookCreate):
        book = Book(**data.dict())
        return self.repo.create_book(book)

    def update(self, book_id: int, data: BookUpdate):
        return self.repo.update_book(book_id, data)

    def delete(self, book_id: int):
        return self.repo.delete_book(book_id)
