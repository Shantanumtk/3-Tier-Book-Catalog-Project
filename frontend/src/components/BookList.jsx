import React from "react";
import BookCard from "./BookCard";

/**
 * Props:
 *  - books: array
 *  - onSave(id, payload)
 *  - onDelete(id)
 */
function BookList({ books, onSave, onDelete }) {
  if (!books.length) {
    return <p className="text-gray-600">No books yet. Add one above.</p>;
  }
  return (
    <div className="grid gap-4">
      {books.map((b) => (
        <BookCard key={b.id} book={b} onSave={onSave} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default BookList;
