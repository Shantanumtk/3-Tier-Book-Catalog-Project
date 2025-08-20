from pydantic import BaseModel, field_validator

class BookCreate(BaseModel):
    title: str
    author: str

    @field_validator("title", "author")
    @classmethod
    def not_empty(cls, v: str):
        if not v or not v.strip():
            raise ValueError("must not be empty")
        return v.strip()

class BookUpdate(BookCreate):
    pass
