from typing import Union

from fastapi import APIRouter, Depends, HTTPException, FastAPI
from app.models import User, Profile, Marketplace
from db.supabase import create_supabase_client
from app.auth import user_id
from app.profiles import get_designer_value
import uuid

# Initialize supabase client
supabase = create_supabase_client()

api = APIRouter(prefix="/marketplaces")

openapi_tags = {
    "name": "marketplaces",
    "description": "Modify and create marketplaces",
}

# Create a new user
@api.post("/create-marketplace", tags=["marketplaces"])
def create_marketplace(marketplace: Marketplace):
    try:

        if get_designer_value()["message"] == "True":
            marketplace_struct = {"name": marketplace.name, "description": marketplace.description, "designer": user_id()['message'], "bidding": marketplace.bidding, "bargaining":marketplace.bargaining, "private": marketplace.private}
            response = (
            supabase.table("marketplaces")
            .insert(marketplace_struct)
            .execute()
        )
            
            if response:
                return {"message": f"{response}"} 
            else:
                return {"message": "Marketplace could not be created"}
        else:
            return {"message": "User does not have designer permissions"}


        
    except Exception as e:
        print("Error: ", e)
        return {"message": e}
    

@api.get("/get-marketplaces", tags=["marketplaces"])
def get_marketplaces():
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")

        response = (
            supabase.table("marketplaces")
            .select("*")
            .eq("designer", id)
            .execute()
        )

        if response:
            return {"message": f"{response}"} 
        else:
            return {"message": "Marketplace could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}