from typing import Union

import bcrypt
from fastapi import FastAPI
from app.models import User
from db.supabase import create_supabase_client

app = FastAPI()
