from fastapi import FastAPI
from app.api.auth import api as auth_router
from app.api.profiles import api as profiles_router
from app.api.marketplace import api as marketplace_router
from app.api.services import api as service_router

app = FastAPI()

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(profiles_router, prefix="/profiles", tags=["profiles"])
app.include_router(marketplace_router, prefix="/marketplaces", tags=["marketplaces"])
app.include_router(service_router, prefix="/services", tags=["services"])