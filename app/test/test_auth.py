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

new_user = {
    "email": "new_user@domanu.com",
    "password": "NewUserPassword"
}

test_user = {
    "email": "test@domanu.com",
    "password": "TestPassword"
}

fake_user = {
    "email": "dummy.email@domanu.com",
    "password": "fakePassword"
}

@pytest.fixture(scope="module", autouse=True)
def cleanup_user():
    print("Running setup: attempting to delete user before tests.")
    try:
        delete_new_user()  # Initial cleanup before tests run
        print("User deleted before tests.")
    except Exception as e:
        print(f"Error during initial cleanup: {e}")


def delete_new_user():
    try:
        supabase = create_client(
        url, 
        secret_key,
        options=ClientOptions(
            auto_refresh_token=False,
            persist_session=False,
        )
        )

        response = supabase.auth.admin.list_users()

        id_uuid = None
        for user in response:
            if user and user.user_metadata["email"] == new_user["email"]:
                id_uuid = uuid.UUID(user.id)
                break  

        # Delete the user if found
        if id_uuid is not None:
            try:
                delete_response = supabase.auth.admin.delete_user(id_uuid)
                print(f"Deleted user: {new_user['email']} (ID: {id_uuid})")
            except Exception as e:
                print(f"Error deleting user: {e}")
    except Exception as e:
        print(f"Error deleting test user: {e}")  # Log the error

# Create New User
def test_create_user():
    response = client.post("/auth/auth/create-user", json=new_user)
    assert response.status_code == 200
    assert response.json()["message"] == "User created successfully"

# Sign In Existing User
def test_sign_in():
    response = client.post("/auth/auth/sign-in", json=test_user)
    assert response.status_code == 200
    assert response.json()["message"] == "User signed in"

# Test retrieving user data
def test_user_data():
    response = client.get("/auth/auth/retrieve-user")
    assert response.status_code == 200
    assert response.json()["message"] is not None

# Test retrieving the user ID
def test_user_id():
    response = client.get("/auth/auth/retrieve-user-id")
    assert response.status_code == 200
    assert "d85a9bde-c6e8-4fbb-8717-9a7e166916bd" in response.json()['message']
    assert isinstance(response.json()["message"], str)
    

# Test retrieving the user ID
def test_sign_out():
    response = client.get("/auth/auth/sign-out")
    assert response.status_code == 200 # no message body

# Test fake user
def test_signin_fake_user():
    response = client.post("/auth/auth/sign-in", json=fake_user)
    assert response.status_code == 200
    assert "User could not be signed" in response.json()["message"]

# Test create user that already exists
def test_existing_user_creation():
    response = client.post("/auth/auth/create-user", json=test_user)
    assert "User already registered" in response.json()['message']['message']
