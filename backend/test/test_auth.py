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

test_user = {
    "email": "test@domanu.com",
    "password": "TestPassword"
}

@pytest.fixture(scope="module", autouse=True)
def cleanup_user():
    print("Running setup: attempting to delete user before tests.")
    try:
        delete_test_user()  # Initial cleanup before tests run
        print("User deleted before tests.")
    except Exception as e:
        print(f"Error during initial cleanup: {e}")


def delete_test_user():
    try:
        supabase = create_client(
        url, 
        secret_key,
        options=ClientOptions(
            auto_refresh_token=False,
            persist_session=False,
        )
        )
        admin_auth_client = supabase.auth.admin

        response = supabase.auth.admin.list_users()
        # Extract users list (ensure response format handling)
        # Find the user ID by matching email
        id_uuid = None
        for user in response:
            if user and user.user_metadata["email"] == test_user["email"]:
                id_uuid = uuid.UUID(user.id)
                break  # Exit loop once found

        # Step 2: Delete the user if found
        if id_uuid is not None:
            try:
                delete_response = supabase.auth.admin.delete_user(id_uuid)
                print(f"Deleted user: {test_user['email']} (ID: {id_uuid})")
            except Exception as e:
                print(f"Error deleting user: {e}")
    except Exception as e:
        print(f"Error deleting test user: {e}")  # Log the error

# Create User
def test_create_user():
    response = client.post("/auth/auth/create-user", json=test_user)
    assert response.status_code == 200
    assert response.json()["message"] == "User created successfully"

# Sign In User
def test_sign_in():
    response = client.post("/auth/auth/sign-in", json=test_user)
    assert response.status_code == 200
    assert response.json()["message"] == "User signed in"

# Test retrieving user data
def test_user_data():
    response = client.get("/auth/auth/retrieve-user")
    assert response.status_code == 200
    assert "message" in response.json()

# Test retrieving the user ID
def test_user_id():
    response = client.get("/auth/auth/retrieve-user-id")
    assert response.status_code == 200
    assert "message" in response.json()
    assert isinstance(response.json()["message"], str)  # User ID should be a string
