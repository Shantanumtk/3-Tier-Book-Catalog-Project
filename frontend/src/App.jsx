import React, { useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { useDebounce } from "./hooks/useDebounce";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

function App() {
  const [books, setBooks] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 350);
  const [loading, setLoading] = useState(false);

  const loadBooks = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const data = await api.getBooks();
      setBooks(Array.isArray(data) ? data : []);
    } catch (e) {
      setFetchError(e.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return books;
    return books.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q)
    );
  }, [books, debounced]);

  const handleAdd = async () => {
    await loadBooks();
  };

  const handleSave = async (id, payload) => {
    await api.updateBook(id, payload);
    // local update for snappy UX
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...payload } : b))
    );
  };

  const handleDelete = async (id) => {
    await api.deleteBook(id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="p-8 font-sans max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">📚 Book Catalog 📚</h1>

      {/* Search + Add */}
      <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Search by title or author…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <BookForm onAdd={handleAdd} />

      {loading && <p className="text-gray-600 mb-2">Loading…</p>}
      {fetchError && <p className="text-red-600 mb-2">{fetchError}</p>}

      <BookList books={filtered} onSave={handleSave} onDelete={handleDelete} />
    </div>
  );
}

export default App;
