import pytest
from fastapi.testclient import TestClient
from app.db.supabase import create_supabase_client, Client
from supabase import Client, create_client
from app.config import url, secret_key
from app.api.main import app  # Adjust import to your FastAPI entry point
from app.api.auth import user_id

supabase = create_supabase_client()

client = TestClient(app)

test_user = {
    "email": "domanu@cs.unc.edu",
    "password": "TestPassword"
}

# @pytest.fixture(scope="module", autouse=True)
# def cleanup_user():
#     print("Running setup: attempting to delete user before tests.")
#     try:
#         delete_test_user()  # Initial cleanup before tests run
#         print("User deleted before tests.")
#     except Exception as e:
#         print(f"Error during initial cleanup: {e}")
    
#     yield  # This line pauses execution until all tests in the module run
    
#     print("Running teardown: attempting to delete user after tests.")
#     try:
#         delete_test_user()  # Final cleanup after tests run
#         print("User deleted after tests.")
#     except Exception as e:
#         print(f"Error during final cleanup: {e}")


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


def test_delete_test_user():
    try:
        id = user_id()
        response = supabase.auth.admin.get_user_by_id(id)
        
        if response.user:
            supabase.auth.admin.delete_user(id)
            print(f"Deleted test user: {id}")
    except Exception as e:
        print(f"Error deleting test user: {e}")  # Log the error

# # Test updating the user email
# def test_update_email():
#     new_email = "newemail@cs.unc.edu"
#     response = client.put(f"/auth/auth/update-email?email={new_email}")
#     assert response.status_code == 200
#     assert response.json()["message"] == "Email updated"

# # Test updating the user password
# def test_update_password():
#     new_password = "NewTestPassword123"
#     response = client.put(f"/auth/auth/update-password?password={new_password}")
#     assert response.status_code == 200
#     assert response.json()["message"] == "Password updated"