from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr


class ProfileResponse(BaseModel):
    id: UUID
    email: EmailStr
    first_name: str
    last_name: str
    phone: str | None
    created_at: datetime

    model_config = {"from_attributes": True}


class AuthMeResponse(BaseModel):
    profile: ProfileResponse
