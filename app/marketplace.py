from typing import Union

import bcrypt
from fastapi import FastAPI, HTTPException
from app.models import Marketplace
from db.supabase import create_supabase_client
import uuid

app = FastAPI()

# Initialize supabase client
supabase = create_supabase_client()

@app.post("/marketplace")
def create_marketplace(marketplace: Marketplace):
    try:
        
        response = (
            supabase.table("marketplace")
            .insert({
                "name": marketplace.name, 
                "description": marketplace.description, 
                "private": marketplace.private, 
                "type": marketplace.type})
            .execute()
        )

        if response.get("data"):
            return {"message": "Marketplace added", "id": new_uuid}
        elif response.get("error"):
            raise HTTPException(status_code=400, detail="Marketplace creation failed: " + response["error"]["message"])
        else:
            raise HTTPException(status_code=400, detail="Marketplace creation failed: Unknown error")
            
    except Exception as e:
        print("Error: ", e)
        return {"message": "Marketplace creation failed"}

