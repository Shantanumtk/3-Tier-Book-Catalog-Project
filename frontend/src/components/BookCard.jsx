import React, { useState } from "react";

/**
 * Inline edit/delete card
 * Props:
 *  - book: { id, title, author }
 *  - onSave(id, payload)
 *  - onDelete(id)
 */
function BookCard({ book, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const handleSave = async () => {
    if (!title.trim() || !author.trim()) {
      setErr("Both fields are required");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      await onSave(book.id, { title: title.trim(), author: author.trim() });
      setEditing(false);
    } catch (e) {
      setErr(e.message || "Failed to save");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${book.title}"?`)) return;
    setBusy(true);
    setErr("");
    try {
      await onDelete(book.id);
    } catch (e) {
      setErr(e.message || "Failed to delete");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      {!editing ? (
        <>
          <h2 className="text-xl font-semibold">{book.title}</h2>
          <p className="text-gray-600 mb-3">by {book.author}</p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
              onClick={handleDelete}
              disabled={busy}
            >
              {busy ? "…" : "Delete"}
            </button>
          </div>
          {err && <p className="text-red-600 mt-2">{err}</p>}
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 mb-3">
            <input
              className="border p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <input
              className="border p-2 rounded"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
            />
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
              onClick={handleSave}
              disabled={busy}
            >
              {busy ? "Saving…" : "Save"}
            </button>
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              onClick={() => {
                setEditing(false);
                setTitle(book.title);
                setAuthor(book.author);
                setErr("");
              }}
            >
              Cancel
            </button>
          </div>
          {err && <p className="text-red-600 mt-2">{err}</p>}
        </>
      )}
    </div>
  );
}

export default BookCard;
