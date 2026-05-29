from typing import Annotated
from uuid import UUID

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.exceptions import InvalidTokenError, ProfileNotFoundError
from app.core.security import decode_supabase_jwt
from app.models.user import Profile
from app.repositories.user_repository import ProfileRepository
from app.services.auth_service import AuthService

bearer_scheme = HTTPBearer(auto_error=False)


def get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    return AuthService(db)


def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)],
    db: Session = Depends(get_db),
) -> Profile:
    if credentials is None:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = decode_supabase_jwt(credentials.credentials)
        user_id = UUID(payload["sub"])
    except (InvalidTokenError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid or expired token") from None

    profile = ProfileRepository(db).get_by_id(user_id)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")

    return profile
