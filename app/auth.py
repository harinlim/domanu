from typing import Union

import bcrypt
from fastapi import FastAPI
from app.models import User
from db.supabase import create_supabase_client

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
    
# Sign out existing user
@app.get("/sign-out")
def sign_out():
    try:
        supabase.auth.sign_out()
    except Exception as e:
        print("Error: ", e)
        return {"message": "User could not be signed out"}
    

@app.get("/retrieve-user-email")
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

@app.put("/update-password")
def update_password(email: str):
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
            return {"message": f"Email updated"} 
        else:
            return {"message": "Could not update email"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}