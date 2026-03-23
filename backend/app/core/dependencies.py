from fastapi import Depends, Request
from app.core.security import verify_jwt_token
from app.services import *

def get_current_user(user: dict = Depends(verify_jwt_token)) -> dict:
    """Get current authenticated user"""
    return user

def get_device_service(request: Request) -> DeviceService:
    return request.app.state.device_service

def get_sensor_service(request: Request) -> SensorService:
    return request.app.state.sensor_service

def get_alert_threshold_service(request: Request) -> AlertThresholdService:
    return request.app.state.alert_threshold_service

def get_device_control_service(request: Request) -> DeviceControlService:
    return request.app.state.device_control_service