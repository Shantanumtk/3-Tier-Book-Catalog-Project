from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_book():
    res = client.post("/books", json={"title": "Test", "author": "Tester"})
    assert res.status_code == 200
    body = res.json()
    assert body["title"] == "Test"
    assert body["author"] == "Tester"

def test_read_books():
    res = client.get("/books")
    assert res.status_code == 200
    assert isinstance(res.json(), list)
