from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    redis_url: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    mongo_url: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017/satya_drishti")
    log_level: str = os.getenv("LOG_LEVEL", "INFO")
    api_key: Optional[str] = os.getenv("API_KEY")
    openai_api_key: Optional[str] = os.getenv("OPENAI_API_KEY")
    huggingface_token: Optional[str] = os.getenv("HUGGINGFACE_TOKEN")
    
    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()