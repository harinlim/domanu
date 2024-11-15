from typing import Union

import bcrypt
from fastapi import FastAPI
from app.models import User
from db.supabase import create_supabase_client
import json

app = FastAPI()

# Initialize supabase client
supabase = create_supabase_client()

# Create a new user
@app.post("/create-user")
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
@app.post("/sign-in")
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
    
@app.get("/session")
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
@app.get("/sign-out")
def sign_out():
    try:
        supabase.auth.sign_out()
    except Exception as e:
        print("Error: ", e)
        return {"message": "User could not be signed out"}
    

@app.get("/retrieve-user")
def user_exists():
    try:
        response = supabase.auth.get_user() # need to convert output to JSON for access to email

        if response:
            return {"message": f"{response}"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}
    
@app.get("/retrieve-user-id")
def user_id():
    try:
        response = supabase.auth.get_user() # need to convert output to JSON for access to email

        if response:
            return {"message": f"{response}"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}

@app.put("/update-email")
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

@app.put("/update-password")
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
    
# @app.delete("/delete-user")
# def delete_user():
#     try:
#         supabase.auth.admin.delete_user(user_exists[])
    
#         return {"message": "User deleted "}
