import jwt
from jwt import PyJWTError

from app.core.config import settings
from app.core.exceptions import InvalidTokenError


def decode_supabase_jwt(token: str) -> dict:
    try:
        payload = jwt.decode(
            token,
            settings.supabase_jwt_secret,
            algorithms=["HS256"],
            audience="authenticated",
        )
    except PyJWTError as exc:
        raise InvalidTokenError("Invalid or expired token") from exc

    user_id = payload.get("sub")
    if not user_id:
        raise InvalidTokenError("Token missing subject")

    return payload
