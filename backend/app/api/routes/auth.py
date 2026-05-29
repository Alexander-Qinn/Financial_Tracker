from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.user import Profile
from app.schemas.auth import AuthMeResponse, ProfileResponse

router = APIRouter()


@router.get("/health")
def auth_health() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/me", response_model=AuthMeResponse)
def get_me(current_user: Profile = Depends(get_current_user)) -> AuthMeResponse:
    return AuthMeResponse(profile=ProfileResponse.model_validate(current_user))
