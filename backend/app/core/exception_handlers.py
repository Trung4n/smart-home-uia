from fastapi import Request
from fastapi.responses import JSONResponse
from app.core.exceptions import *

# Map: exception class -> HTTP status code
EXCEPTION_STATUS_MAP = {
    NotFoundException:   404,
    ValidationException: 400,
    DatabaseException:   500,
}

async def app_exception_handler(request: Request, exc: AppException):
    status_code = next(
        (code for cls, code in EXCEPTION_STATUS_MAP.items() if isinstance(exc, cls)),
        500,  # fallback
    )
    return JSONResponse(
        status_code=status_code,
        content={"detail": exc.message},
    )