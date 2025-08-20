# 📚 Book Catalog — 3-Tier Web Application

A complete 3-tier **Book Catalog system** built using:

* **Backend**: FastAPI (Python) with Service–Repository–Controller pattern
* **Frontend**: React + Tailwind CSS
* **Database**: PostgreSQL
* **Deployment**: Docker & Docker Compose
* **Testing**: Pytest (backend), React Testing Library (frontend)
* **Load Testing**: k6 and Locust

---

## 🚀 Features

* Add / Update / Delete / List books
* React forms with validation & error handling
* Environment variables managed via `.env`
* Unit tests for backend APIs
* Tailwind-based responsive UI
* Dockerized for easy local development
* Load testing setup with **k6** & **Locust**

---

## 📂 Project Structure

```
Book-Catalog/
├── backend/                 # FastAPI app
│   ├── app/
│   │   ├── controllers/     # Route handlers
│   │   ├── services/        # Business logic
│   │   ├── repositories/    # DB queries
│   │   ├── models/          # SQLAlchemy models
│   │   ├── database.py      # DB connection
│   │   └── main.py          # Entry point
│   ├── tests/               # Pytest unit tests
│   ├── requirements.txt
│   └── .env
│
├── frontend/                # React + Tailwind
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── .env
│
├── load-tests/
│   ├── k6/                  # k6 load tests
│   │   ├── basic-test.js
│   │   └── spike-test.js
│   └── locust/              # Locust load tests
│       └── locustfile.py
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/book-catalog.git
cd book-catalog
```

### 2. Configure environment variables

* Backend (`backend/.env`)

  ```env
  POSTGRES_USER=book_user
  POSTGRES_PASSWORD=book_pass
  POSTGRES_DB=book_catalog
  POSTGRES_HOST=db
  POSTGRES_PORT=5432
  ```

* Frontend (`frontend/.env`)

  ```env
  VITE_BACKEND_URL=http://localhost:8000
  ```

### 3. Run with Docker Compose

```bash
docker-compose up --build
```

* Backend → [http://localhost:8000/docs](http://localhost:8000/docs)
* Frontend → [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing

### Backend unit tests (Pytest)

```bash
cd backend
pytest -v
```

### Frontend tests (React)

```bash
cd frontend
npm test
```

---

## 📊 Load Testing

### k6 (basic ramping test)

```bash
k6 run load-tests/k6/basic-test.js
```

### Locust (web UI at :8089)

```bash
locust -f load-tests/locust/locustfile.py
```

---

## 📖 API Examples

### Add a new book

`POST /books`

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008,
  "genre": "Software Engineering"
}
```

### Get all books

`GET /books`

---

## 🎨 Screenshots

*(Optional: add screenshots of frontend UI here)*

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue for significant changes.

---

## 📜 License

MIT License © 2025 \[Your Name]
