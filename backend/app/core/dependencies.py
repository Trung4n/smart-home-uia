from fastapi import Depends, Request
from app.core.security import verify_jwt_token
from app.repositories.device_repository import DeviceRepository
from app.services.device_service import DeviceService

def get_current_user(user: dict = Depends(verify_jwt_token)) -> dict:
    """Get current authenticated user"""
    return user

def get_device_service(request: Request) -> DeviceService:
    return request.app.state.device_service