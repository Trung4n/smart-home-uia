from pydantic import BaseModel
from typing import Optional

class ActionEnum(str):
    TURN_ON = "turn_on"
    TURN_OFF = "turn_off"
    SET_COLOR = "set_color"
    SET_ANGLE = "set_angle"
    SET_SPEED = "set_speed"

class SourceEnum(str):
    APP = "app"
    REMOTE = "remote"
    AUTO = "auto"

class DeviceControlCreate(BaseModel):
    device_id: int
    action: str
    value: Optional[str]
    source: str

class DeviceControlUpdate(BaseModel):
    pass

class DeviceControlResponse(BaseModel):
    device_control_id: int
    device_id: int
    action: str
    value: Optional[str]
    source: str
    executed_at: str