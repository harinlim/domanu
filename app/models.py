from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    email: str
    password: str

class Marketplace(BaseModel):
    name: str
    description: str
    private: bool
    type: str