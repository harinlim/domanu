from typing import Union

from fastapi import APIRouter, Depends, HTTPException, FastAPI
from app.api.models import User, Profile, Marketplace, Services
from app.db.supabase import create_supabase_client
from app.api.auth import user_id
from app.api.profiles import get_designer_value, get_marketplaces
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
                return {"message": "Marketplace could not be created"}
        else:
            return {"message": "User does not have designer permissions"}


        
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
    
# Edit name of a services that the logged-in user owns
@api.put("/update-service-name", tags=["services"])
def update_service_name(new_name: str):
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")

        response = (
        supabase.table("services")
        .update({"name": new_name})
        .eq("seller", id)
        .execute()
        )

        if response:
            return {"message": f"{response}"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}
    
# Edit description of a services that the logged-in user owns
@api.put("/update-service-description", tags=["services"])
def update_service_description(new_description: str):
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")

        response = (
        supabase.table("services")
        .update({"description": new_description})
        .eq("seller", id)
        .execute()
        )

        if response:
            return {"message": f"{response}"} 
        else:
            return {"message": "User could not be found"}
    except Exception as e:
        print("Error: ", e)
        return {"message": e}
    
# Edit price of a services that the logged-in user owns
@api.put("/update-service-price", tags=["services"])
def update_service_price(new_price: float):
    try:
        try:
            id = uuid.UUID(user_id()['message'])  # Convert to UUID
        except ValueError:
            raise ValueError("Invalid UUID format for user ID")

        response = (
        supabase.table("services")
        .update({"price": new_price})
        .eq("seller", id)
        .execute()
        )

        if response:
            return {"message": f"{response}"} 
        else:
            return {"message": "User could not be found"}
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
