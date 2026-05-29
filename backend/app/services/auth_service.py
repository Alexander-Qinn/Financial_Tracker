from uuid import UUID

from sqlalchemy.orm import Session

from app.core.exceptions import ProfileNotFoundError
from app.models.user import Profile
from app.repositories.user_repository import ProfileRepository


class AuthService:
    def __init__(self, db: Session) -> None:
        self.profiles = ProfileRepository(db)

    def get_profile_for_user(self, user_id: UUID) -> Profile:
        profile = self.profiles.get_by_id(user_id)
        if profile is None:
            raise ProfileNotFoundError("Profile not found")
        return profile
