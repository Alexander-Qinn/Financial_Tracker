from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_name: str = "Financial OS"
    database_url: str = "postgresql://postgres:postgres@localhost:5432/financial_os"
    secret_key: str = "change-me"
    access_token_expire_minutes: int = 30


settings = Settings()
