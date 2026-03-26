from pydantic import BaseModel
from typing import Optional


class NotificationCreate(BaseModel):
    device_id: Optional[int] = None
    title: str
    description: str
    notification_type: str
    severity: str
    is_read: Optional[bool] = False


class NotificationUpdate(BaseModel):
    is_read: bool


class NotificationResponse(BaseModel):
    notification_id: int
    device_id: Optional[int] = None
    title: str
    description: str
    notification_type: str
    severity: str
    is_read: bool
    created_at: str