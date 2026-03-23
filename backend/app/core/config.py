from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str
    HOST: str
    PORT: int
    ENVIRONMENT: str
    DEBUG: bool
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_JWT_SECRET: str
    MQTT_BROKER: str
    MQTT_PORT: int

    COR_ORIGINS: list[str]
    class Config:
        env_file = ".env"

settings = Settings()