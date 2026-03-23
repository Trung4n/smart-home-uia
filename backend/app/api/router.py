from fastapi import APIRouter
from app.api.endpoints import *

api_router = APIRouter()

# api_router.include_router(auth.router,    prefix="/auth",    tags=["Auth"])
# api_router.include_router(users.router,   prefix="/users",   tags=["Users"])
api_router.include_router(devices.router, prefix="/devices", tags=["Devices"])
api_router.include_router(sensors.router, prefix="/sensors", tags=["Sensors"])
api_router.include_router(alert_thresholds.router, prefix="/alert-thresholds", tags=["Alert Thresholds"])
api_router.include_router(device_controls.router, prefix="/device-controls", tags=["Device Controls"])