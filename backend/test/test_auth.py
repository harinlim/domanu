import pytest
from fastapi.testclient import TestClient
from backend.db.supabase import create_supabase_client, Client
from supabase import Client, create_client
from backend.config import url, secret_key
from backend.api.main import app  # Adjust import to your FastAPI entry point
from backend.api.auth import user_id
import uuid

from supabase.lib.client_options import ClientOptions

authors = ["Chiara Sabato"]

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

invalid_user = {
    "email": "dummy.email@domanu.com",
    "password": "12345"
}

empty_user = {
    "email": "",
    "password": ""
}

# Autorun to delete test user
@pytest.fixture(scope="module", autouse=True)
def cleanup_user():
    print("Running setup: attempting to delete user before tests.")
    try:
        delete_new_user()  # Initial cleanup before tests run
        print("User deleted before tests.")
    except Exception as e:
        print(f"Error during initial cleanup: {e}")

# Deletes test user so tests can be rerun with same data - user exists as a test user in the database until a new 
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

# Sign In Existing User
def test_sign_in():
    response = client.post("/auth/sign-in", json=test_user)
    assert response.status_code == 200
    assert response.json()["message"] == "User signed in"

# Test retrieving user data
def test_user_data():
    response = client.get("/auth/retrieve-user")
    assert response.status_code == 200
    assert response.json()["message"] is not None

# Test retrieving the user ID
def test_user_id():
    response = client.get("/auth/retrieve-user-id")
    assert response.status_code == 200
    assert "fd7bd7de-cb6e-4645-81a2-ac1c395fce9b" in response.json()['message']
    assert isinstance(response.json()["message"], str)

# Test signing out logged in user
def test_sign_out():
    response = client.get("/auth/sign-out")
    assert response.status_code == 200 # no message body

# Create New User
def test_create_user():
    response = client.post("/auth/create-user", json=new_user)
    assert response.status_code == 200
    assert response.json()["message"] == "User created successfully"

# Sign new user in and out
def sign_in_out_new_user():
    response = client.post("/auth/sign-in", json=new_user)
    assert response.status_code == 200
    assert response.json()["message"] == "User signed in"
    response = client.get("/auth/sign-out")
    assert response.status_code == 200 # no message body

## Edge Case Tests

# Test invalid password with length < 6
def test_sign_up_invalid_users():
    response = client.post("/auth/create-user", json=invalid_user)
    assert "Password should be at least 6 characters." in response.json()['message']['message']

# Test user with no data
def test_sign_up_empty_user():
    response = client.post("/auth/create-user", json=empty_user)
    assert "You must provide either an email or phone number and a password" in response.json()['message']['message']

# Test create user that already exists
def test_existing_user_creation():
    response = client.post("/auth/create-user", json=test_user) # user was created at the start of the tests - should not create again
    assert "User already registered" in response.json()['message']['message']

# Test fake user
def test_signin_fake_user():
    response = client.post("/auth/sign-in", json=fake_user)
    assert response.status_code == 200
    assert "User could not be signed" in response.json()["message"]