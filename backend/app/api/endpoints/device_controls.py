from fastapi import APIRouter, Depends, status
from app.schemas.device_control import *
from app.services import DeviceControlService
from app.core.dependencies import *

router = APIRouter(
    tags=["DeviceControls"],
    dependencies=[Depends(get_current_user)]
)

@router.get("/", response_model=list[DeviceControlResponse])
def list_device_controls(
    device_id: int | None = None, # ?device_id={device_id}
    service: DeviceControlService = Depends(get_device_control_service),
):
    if device_id:
        return service.get_by_device_id(device_id)
    return service.get_all()

@router.post("/", response_model=DeviceControlResponse, status_code=status.HTTP_201_CREATED)
def create_device_control(
    payload: DeviceControlCreate,
    service: DeviceControlService = Depends(get_device_control_service),
):
    return service.create(payload)