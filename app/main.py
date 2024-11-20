from fastapi import FastAPI
from app.auth import api as auth_router
from app.profiles import api as profiles_router
from app.marketplace import api as marketplace_router

app = FastAPI()

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(profiles_router, prefix="/profiles", tags=["profiles"])
app.include_router(marketplace_router, prefix="/marketplaces", tags=["marketplaces"])