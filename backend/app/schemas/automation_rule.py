from pydantic import BaseModel
from typing import Optional


class AutomationRuleCreate(BaseModel):
    device_id: int
    sensor_id: Optional[int] = None
    automation_rule_name: str
    trigger_type: str
    condition_operator: Optional[str] = None
    condition_value: Optional[float] = None
    schedule_time: Optional[str] = None
    repeat_days: Optional[str] = None
    action: str
    is_active: Optional[bool] = True


class AutomationRuleUpdate(BaseModel):
    device_id: Optional[int] = None
    sensor_id: Optional[int] = None
    automation_rule_name: Optional[str] = None
    trigger_type: Optional[str] = None
    condition_operator: Optional[str] = None
    condition_value: Optional[float] = None
    schedule_time: Optional[str] = None
    repeat_days: Optional[str] = None
    action: Optional[str] = None
    is_active: Optional[bool] = None


class AutomationRuleResponse(BaseModel):
    automation_rule_id: int
    device_id: int
    sensor_id: Optional[int] = None
    automation_rule_name: str
    trigger_type: str
    condition_operator: Optional[str] = None
    condition_value: Optional[float] = None
    schedule_time: Optional[str] = None
    repeat_days: Optional[str] = None
    action: str
    is_active: bool