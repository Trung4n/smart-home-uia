from pydantic import BaseModel
from typing import Optional
from app.core.enums import DeviceTypeEnum, DeviceModeEnum

class DeviceCreate(BaseModel):
    device_name: str
    device_type: DeviceTypeEnum
    pin_number: int
    location: Optional[str] = "Unknown"
    status: Optional[str] = "online"
    is_active: Optional[bool] = True

class DeviceUpdate(BaseModel):
    device_name: Optional[str] = None
    device_type: Optional[DeviceTypeEnum] = None
    pin_number: Optional[int] = None
    location: Optional[str] = None
    device_mode: Optional[DeviceModeEnum] = None
    status: Optional[str] = None
    is_active: Optional[bool] = None

class DeviceResponse(BaseModel):
    device_id: int
    device_name: str
    device_type: DeviceTypeEnum
    pin_number: int
    location: str
    device_mode: DeviceModeEnum
    status: str
    is_active: bool
    