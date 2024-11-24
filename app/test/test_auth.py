import pytest
from fastapi.testclient import TestClient
from db.supabase import create_supabase_client, Client
from app.main import app  # Adjust import to your FastAPI entry point

supabase = create_supabase_client()

client = TestClient(app)

test_user = {
    "email": "csabato@cs.unc.edu",
    "password": "TestPassword"
}

@pytest.fixture(scope="module", autouse=True)
def cleanup_user():
    """Cleanup: Delete test user before and after tests."""
    # Try deleting the user before tests start
    delete_test_user()
    yield
    # Cleanup after tests finish
    delete_test_user()

def delete_test_user():
    try:
        response = supabase.auth.sign_in_with_password(
            {"email": test_user["email"], "password": test_user["password"]}
        )
        if response.user:
            supabase.auth.admin.delete_user(response.user.id)
    except Exception as e:
        pass

# Create User
def test_create_user():
    response = client.post("/auth/create-user", json=test_user)
    assert response.status_code == 200
    assert response.json()["message"] == "User created successfully"

# Sign In User
def test_sign_in():
    response = client.post("/auth/sign-in", json=test_user)
    assert response.status_code == 200
    assert response.json()["message"] == "User signed in"