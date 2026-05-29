from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import Profile


class ProfileRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, user_id: UUID) -> Profile | None:
        return self.db.scalar(select(Profile).where(Profile.id == user_id))

    def get_by_email(self, email: str) -> Profile | None:
        return self.db.scalar(select(Profile).where(Profile.email == email))

    def exists_by_email(self, email: str) -> bool:
        return self.get_by_email(email) is not None
