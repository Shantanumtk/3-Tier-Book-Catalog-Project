// Centralized API layer with consistent error handling

const BASE_URL = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") || "http://localhost:8000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  // Try to parse JSON, but keep text fallback for error messages
  const text = await res.text();
  const data = (() => {
    try { return text ? JSON.parse(text) : null; } catch { return text; }
  })();

  if (!res.ok) {
    const msg = typeof data === "string" && data ? data : (data?.detail || "Request failed");
    const error = new Error(msg);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

export const api = {
  getBooks: () => request("/books", { method: "GET" }),
  createBook: (payload) => request("/books", { method: "POST", body: JSON.stringify(payload) }),
  updateBook: (id, payload) => request(`/books/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteBook: (id) => request(`/books/${id}`, { method: "DELETE" }),
};
