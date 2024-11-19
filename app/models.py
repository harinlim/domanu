import uuid
from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    email: str
    password: str


class Profile(BaseModel):
    #id: Optional[int] = None
    first: str
    last: str
    username: str
    #designer: b
