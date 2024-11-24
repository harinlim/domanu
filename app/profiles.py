from typing import Union

from fastapi import APIRouter, Depends, HTTPException, FastAPI
from fastapi.encoders import jsonable_encoder
from app.models import User, Profile
from db.supabase import create_supabase_client
from app.auth import user_id
import uuid

# Initialize supabase client
supabase = create_supabase_client()

api = APIRouter(prefix="/profiles")

openapi_tags = {
    "name": "profiles",
    "description": "Modify and create user profiles",
}

# Update a new profile connected to user
@api.post("/update-user", tags=["profiles"])
def update_profile(profile: Profile):
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")

        user = {"first_name": profile.first, "last_name": profile.last, "username": profile.username}
        response = (
        supabase.table("profiles")
        .update(user)
        .eq("id", id)
        .execute()
        )

        if response:
            return {"message": f"{response}"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}
    

@api.post("/make-designer", tags=["profiles"])
def make_designer():
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")

        response = (
        supabase.table("profiles")
        .update({"designer": True})
        .eq("id", id)
        .execute()
        )

        if response:
            return {"message": f"{response}"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}
    

@api.get("/get_first_name", tags=["profiles"])
def get_username():
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")

        response = (
            supabase.table("profiles")
            .select("username")
            .eq("id", id)
            .execute()
        )

        if response:
            return {"message": f"{response.data[0]['username']}"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}


@api.get("/get_first_name", tags=["profiles"])
def get_first_name():
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")

        response = (
            supabase.table("profiles")
            .select("first_name")
            .eq("id", id)
            .execute()
        )

        if response:
            return {"message": f"{response.data[0]['first_name']}"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}
    

@api.get("/get_last_name", tags=["profiles"])
def get_last_name():
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")

        response = (
            supabase.table("profiles")
            .select("last_name")
            .eq("id", id)
            .execute()
        )

        if response:
            return {"message": f"{response.data[0]['last_name']}"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}
    

@api.get("/get_designer", tags=["profiles"])
def get_designer_value():
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")

        response = (
            supabase.table("profiles")
            .select("designer")
            .eq("id", id)
            .execute()
        )

        if response:
            return {"message": f"{response.data[0]['designer']}"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}


@api.get("/get_user_profile", tags=["profiles"])
def get_user_profile():
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")

        response = (
            supabase.table("profiles")
            .select("first_name, last_name")
            .eq("id", id)
            .execute()
        )

        if response:
            return {"message": f"{response.data[0]['first_name']} {response.data[0]['last_name']}"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}
    
@api.get("/get_member_marketplaces", tags=["profiles"])
def get_marketplaces():
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")

        response = (
            supabase.table("profiles")
            .select("member_marketplaces")
            .eq("id", id)
            .execute()
        )

        if response:
            print(type(response.data[0]['member_marketplaces']))
            return {"message": f"{response.data[0]['member_marketplaces']}"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}

@api.get("/join_marketplaces", tags=["profiles"])
def join_marketplaces(marketplace_id: int):
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")

        # Fetch the current member_marketplace list
        profile = supabase.table("profiles").select("member_marketplaces").eq("id", id).single().execute()
        if not profile.data:
            return {"message": "User profile not found"}

        # Get existing list or initialize it
        current_marketplaces = profile.data.get("member_marketplaces") or []
        if marketplace_id in current_marketplaces:
            return {"message": "Already a member of this marketplace"}

        # Append the new marketplace_id to the array
        response = (
            supabase.table("profiles")
            .update({"member_marketplaces": current_marketplaces + [marketplace_id]})
            .eq("id", id)
            .execute()
        )

        if response:
            return {"message": f"Marketplace joined"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}