from typing import Union

from fastapi import APIRouter, Depends, HTTPException, FastAPI
from backend.api.models import User, Profile, Marketplace, Services
from backend.db.supabase import create_supabase_client
from backend.api.auth import user_id
from backend.api.profiles import get_designer_value, get_marketplaces
import uuid

 

# Initialize supabase client
supabase = create_supabase_client()

api = APIRouter(prefix="/services")

openapi_tags = {
    "name": "services",
    "description": "Modify and create services",
}

# Create a new service for logged-in user
@api.post("/create-service", tags=["services"])
def create_service(service: Services):
    try:

        if str(service.marketplace_id) in get_marketplaces()['message']:
            service_struct = {"name": service.name, "description": service.description, "price": service.price, "seller": user_id()['message'], "marketplace": service.marketplace_id, "active": service.active}
            response = (
            supabase.table("services")
            .insert(service_struct)
            .execute()
        )
            if response:
                return {"message": f"{response}"} 
            else:
                return {"message": "Service could not be created"}
        else:
            return {"message": "Service could not be created"}
        
    except Exception as e:
        print("Error: ", e)
        return {"message": e}
    
# Get the services owned by the logged-in user
@api.get("/get-services", tags=["services"])
def get_services():
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")

        response = (
            supabase.table("services")
            .select("*")
            .eq("seller", id)
            .execute()
        )

        if response:
            return {"message": f"{response}"} 
        else:
            return {"message": "Services could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}

# Delete service of the logged-in user
@api.delete("/delete-service", tags=["services"])
def delete_service(service_id: int):
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")
            
        response = supabase.table('services').delete().eq('id', service_id).execute()

        if response:
            return {"message": f"{response}"} 
        else:
            return {"message": "Services could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}

# Gets the marketplace services based on marketplace id
@api.get("/marketplace/{marketplace_id}", tags=["services"])
def get_marketplace_services(marketplace_id: int):
    try:
        response = (
            supabase.table("services")
            .select("*")
            .eq("marketplace", marketplace_id)
            .eq("active", True)
            .execute()
        )
        
        if response.data:
            return {
                "status": "success",
                "data": response.data
            }
        return {"status": "success", "data": []}
    except Exception as e:
        print("Error: ", e)
        return {"status": "error", "message": str(e)}

# Retrieves all services
@api.get("/all-services", tags=["services"])
def get_all_services():
    try:
        response = (
            supabase.table("services")
            .select("*")
            .eq("active", True)
            .execute()
        )
        
        if response.data:
            return {
                "status": "success",
                "data": response.data
            }
        return {"status": "success", "data": []}
    except Exception as e:
        print("Error: ", e)
        return {"status": "error", "message": str(e)}

# Retrieves service from ID
@api.get("/service/{service_id}", tags=["services"])
def get_service_by_id(service_id: int):
    try:
        response = (
            supabase.table("services")
            .select("*")
            .eq("id", service_id)
            .execute()
        )

        if response.data:
            return {
                "status": "success",
                "data": response.data[0]
            }
        return {"status": "success", "data": None}
    except Exception as e:
        print("Error: ", e)
        return {"status": "error", "message": str(e)}