from app.models import Book
from sqlalchemy.orm import Session

class BookRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all_books(self):
        return self.db.query(Book).all()

    def get_by_id(self, book_id: int):
        return self.db.get(Book, book_id)

    def create_book(self, book: Book):
        self.db.add(book)
        self.db.commit()
        self.db.refresh(book)
        return book

    def update_book(self, book_id: int, data):
        book = self.get_by_id(book_id)
        if not book:
            return None
        book.title = data.title
        book.author = data.author
        self.db.commit()
        self.db.refresh(book)
        return book

    def delete_book(self, book_id: int):
        book = self.get_by_id(book_id)
        if not book:
            return False
        self.db.delete(book)
        self.db.commit()
        return True
