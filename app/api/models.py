import uuid
from pydantic import BaseModel
from typing import Optional

authors = ["Chiara Sabato"]

class User(BaseModel):
    email: str
    password: str


class Profile(BaseModel):
    first: str
    last: str
    username: str

class Marketplace(BaseModel):
    name: str
    description: str
    bidding: bool
    bargaining: bool
    private: bool

class Services(BaseModel):
    name: str
    description: str
    price: float
    active: bool
    marketplace_id: int