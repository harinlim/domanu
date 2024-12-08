from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.auth import api as auth_router
from backend.api.profiles import api as profiles_router
from backend.api.marketplace import api as marketplace_router
from backend.api.services import api as service_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, tags=["auth"])
app.include_router(profiles_router, tags=["profiles"])
app.include_router(marketplace_router, tags=["marketplaces"])
app.include_router(service_router, tags=["services"])