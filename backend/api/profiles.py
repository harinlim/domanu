from typing import Union

from fastapi import APIRouter, Depends, HTTPException, FastAPI
from fastapi.encoders import jsonable_encoder
from backend.api.models import User, Profile, ProfileUpdate
from backend.db.supabase import create_supabase_client
from backend.api.auth import user_id
import uuid
from uuid import UUID

 

# Initialize supabase client
supabase = create_supabase_client()

api = APIRouter(prefix="/profiles")

openapi_tags = {
    "name": "profiles",
    "description": "Modify and create user profiles",
}

# Update a new profile connected to user
@api.post("/update-user", tags=["profiles"])
def update_profile(profile: ProfileUpdate):
    print("hi", profile)
    try:
        try:
            # id = uuid.UUID(user_id()['message'])  # Convert to UUID
            id = uuid.UUID(profile.uuid)
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
            print(response)
            return {"message": f"{response}"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}
    
# Gives user designer permissions - will need to be an action only by admin later
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
    
# Retrieves users username
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

# Retrieves users first name
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
    
# Retrieves users last name
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
    
# Retrieves designer value
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

# Gets full user profile
@api.get("/get_user_profile", tags=["profiles"])
def get_user_profile():
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")

        response = (
            supabase.table("profiles")
            .select("*")
            .eq("id", id)
            .execute()
        )

        profile = Profile(first=response.data[0]['first_name'], last=response.data[0]['last_name'], username=response.data[0]['username'])

        if response:
            return {"message": profile} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}
    
# Returns maketplaces user is a member of
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

# Allows user to join new marketplaces
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
    
# Retrieves username from UUID
@api.get("/username/{user_id}", tags=["profiles"])
def get_username_by_id(user_id: UUID):
    try:
        response = (
            supabase.table("profiles")
            .select("username")
            .eq("id", user_id)
            .execute()
        )

        if response.data:
            return {
                "status": "success",
                "data": response.data
            }
        return {"status": "success", "data": None}
    except Exception as e:
        print("Error: ", e)
        return {"status": "error", "message": str(e)}