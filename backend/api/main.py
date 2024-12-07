from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth import api as auth_router
from app.api.profiles import api as profiles_router
from app.api.marketplace import api as marketplace_router
from app.api.services import api as service_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(profiles_router, prefix="/profiles", tags=["profiles"])
app.include_router(marketplace_router, prefix="/marketplaces", tags=["marketplaces"])
app.include_router(service_router, prefix="/services", tags=["services"])