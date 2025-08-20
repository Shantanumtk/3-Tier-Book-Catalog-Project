import React, { useState } from "react";

function BookForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      setError("Both fields are required");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), author: author.trim() })
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Failed to add book");
      }
      onAdd?.();
      setTitle("");
      setAuthor("");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        className="border p-2 flex-1 rounded"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        className="border p-2 flex-1 rounded"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        placeholder="Author"
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-60"
        type="submit"
        disabled={busy}
      >
        {busy ? "Adding..." : "Add"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}

export default BookForm;
