from pydantic import BaseModel
from typing import Optional

class DeviceCreate(BaseModel):
    device_name: str
    device_type: str
    pin_number: int
    location: Optional[str] = "Unknown"
    status: Optional[str] = "online"
    is_active: Optional[bool] = True

class DeviceUpdate(BaseModel):
    device_name: Optional[str]
    device_type: Optional[str]
    pin_number: Optional[int]
    location: Optional[str]
    status: Optional[str]
    is_active: Optional[bool]

class DeviceResponse(BaseModel):
    id: int
    device_name: str
    device_type: str
    pin_number: int
    location: Optional[str] = "Unknown"
    status: str
    is_active: Optional[bool] = True
    