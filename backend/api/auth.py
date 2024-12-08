from typing import Union
from fastapi import APIRouter, Depends, HTTPException, FastAPI
from backend.api.models import User
from backend.db.supabase import create_supabase_client
import json
import uuid

# Initialize supabase client
supabase = create_supabase_client()

api = APIRouter(prefix="/auth")

openapi_tags = {
    "name": "auth",
    "description": "Modify and create accounts.",
}


# Create a new user
@api.post("/create-user", tags=["auth"])
def create_user(user: User):
    try:
        # Convert email to lowercase
        user_email = user.email.lower()
        
        response = supabase.auth.sign_up(
            {"email": user_email, "password": user.password}
        )

        # Check if user was added
        if response:
            return {"message": "User created successfully"}
        else:
            return {"message": "User creation failed"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}

# Sign in existing user
@api.post("/sign-in", tags=["auth"])
def sign_in(user: User):
    try:
        response = supabase.auth.sign_in_with_password(
            {"email": user.email, "password": user.password})
        
        # Check if user was added
        if response:
            return {"message": "User signed in"}
        else:
            return {"message": "User could not be signed in"}
    except Exception as e:
        print("Error: ", e)
        return {"message": "User could not be signed in"}
    
@api.get("/session", tags=["auth"])
def get_session():
    try:
        response = supabase.auth.get_session()

        if response:
            return {"message": response}
        else:
            return {"message": "User could not be signed in"}
    except Exception as e:
        print("Error:", e)
        return {"message": "Session data cannot be retrieved"}

    
# Sign out existing user
@api.get("/sign-out", tags=["auth"])
def sign_out():
    try:
        supabase.auth.sign_out()
    except Exception as e:
        print("Error: ", e)
        return {"message": "User could not be signed out"}
    

@api.get("/retrieve-user", tags=["auth"])
def user_data():
    try:
        response = supabase.auth.get_user() # need to convert output to JSON for access to email
        print(response.user.id)
        if response:
            return {"message": f"{response}"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}
    
@api.get("/retrieve-user-id", tags=["auth"])
def user_id():
    try:
        response = supabase.auth.get_user() # need to convert output to JSON for access to email

        if response:
            return {"message": f"{response.user.id}"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}

@api.put("/update-email", tags=["auth"])
def update_email(email: str):
    try:
        response = supabase.auth.update_user({
            "email": email.lower()})
        
        if response:
            return {"message": f"Email updated"} 
        else:
            return {"message": "Could not update email"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}

@api.put("/update-password", tags=["auth"])
def update_password(password: str):
    try:
        response = supabase.auth.update_user({"password": password})

        if response:
            return {"message": f"Password updated"} 
        else:
            return {"message": "Could not update password"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}
    