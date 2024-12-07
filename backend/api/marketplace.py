from typing import Union

from fastapi import APIRouter, Depends, HTTPException, FastAPI
from app.api.models import User, Profile, Marketplace
from app.db.supabase import create_supabase_client
from app.api.auth import user_id
from app.api.profiles import get_designer_value
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
            return {
                "status": "success",
                "data": response.data,  # This is already a list of dictionaries
                "count": len(response.data)
            }
        else:
            return {
                "status": "error",
                "message": "No marketplaces found",
                "data": []
            }
    except Exception as e:
        print("Error: ", e)
        return {
            "status": "error",
            "message": str(e),
            "data": []
        }

@api.get("/{marketplace_id}", tags=["marketplaces"])
def get_marketplace(marketplace_id: int):
    try:
        response = (
            supabase.table("marketplaces")
            .select("*")
            .eq("id", marketplace_id)
            .single()
            .execute()
        )
        
        if response.data:
            return {
                "status": "success",
                "data": response.data
            }
        return {"status": "error", "message": "Marketplace not found"}
    except Exception as e:
        print("Error: ", e)
        return {"status": "error", "message": str(e)}