import pytest
from fastapi.testclient import TestClient
from app.db.supabase import create_supabase_client, Client
from supabase import Client, create_client
from app.config import url, secret_key
from app.api.main import app  # Adjust import to your FastAPI entry point
from app.api.auth import user_id
import uuid

from supabase.lib.client_options import ClientOptions

supabase = create_supabase_client()

client = TestClient(app)

test_marketplace = {
    "name": "test@domanu.com",
    "description": "TestPassword",
    "bidding": False,
    "bargaining": True,
    "private": True
}

def test_create_marketplace():
    response = client.post("/auth/auth/create-", json=test_marketplace)
    assert response.status_code == 200
    assert response.json()["message"] == "User created successfully"