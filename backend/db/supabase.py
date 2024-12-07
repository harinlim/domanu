from supabase import Client, create_client
from app.config import api, url, secret_key

api_url: str = url
key: str = secret_key

def create_supabase_client():
    supabase: Client = create_client(url, secret_key)
    return supabase