class AuthError(Exception):
    pass


class InvalidTokenError(AuthError):
    pass


class ProfileNotFoundError(AuthError):
    pass
