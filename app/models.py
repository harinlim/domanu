import uuid
from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    email: str
    password: str

class Marketplace(BaseModel):
    id: Optional[int] = None
    name: str
    description: str
    private: bool
    type: str
    owner: Optional[int] = None

class Services(BaseModel):
    id: Optional[int] = None
    marketplace: Optional[int] = None
    title: str
    description: str
    seller: Optional[int] = None
