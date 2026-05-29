import uuid
from datetime import datetime, timedelta, timezone

import jwt
import pytest

from app.core.config import settings
from app.core.security import decode_supabase_jwt


def _make_token(
    *,
    secret: str | None = None,
    sub: str | None = None,
    expired: bool = False,
) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": sub or str(uuid.uuid4()),
        "email": "user@example.com",
        "aud": "authenticated",
        "exp": now + (timedelta(seconds=-1) if expired else timedelta(hours=1)),
        "iat": now,
    }
    return jwt.encode(payload, secret or settings.supabase_jwt_secret, algorithm="HS256")


def test_decode_supabase_jwt_valid():
    token = _make_token()
    payload = decode_supabase_jwt(token)
    assert payload["aud"] == "authenticated"
    assert payload["email"] == "user@example.com"


def test_decode_supabase_jwt_expired():
    token = _make_token(expired=True)
    with pytest.raises(Exception):
        decode_supabase_jwt(token)


def test_decode_supabase_jwt_invalid_signature():
    token = _make_token(secret="wrong-secret")
    with pytest.raises(Exception):
        decode_supabase_jwt(token)
