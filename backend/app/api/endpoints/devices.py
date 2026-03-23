from fastapi import APIRouter, Depends, status
from app.schemas.device import DeviceCreate, DeviceUpdate, DeviceResponse
from app.services import DeviceService
from app.core.dependencies import *

router = APIRouter(
    tags=["Devices"],
    dependencies=[Depends(get_current_user)]
)


@router.get("/", response_model=list[DeviceResponse])
def list_devices(
    service: DeviceService = Depends(get_device_service),
):
    return service.get_all()


@router.get("/{device_id}", response_model=DeviceResponse)
def get_device(
    device_id: int,
    service: DeviceService = Depends(get_device_service),
):
    return service.get_by_id(device_id)


@router.post("/", response_model=DeviceResponse, status_code=status.HTTP_201_CREATED)
def create_device(
    payload: DeviceCreate,
    service: DeviceService = Depends(get_device_service),
):
    return service.create(payload)


@router.put("/{device_id}", response_model=DeviceResponse)
def update_device(
    device_id: int,
    payload: DeviceUpdate,
    service: DeviceService = Depends(get_device_service),
):
    return service.update(device_id, payload)


@router.delete("/{device_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_device(
    device_id: int,
    service: DeviceService = Depends(get_device_service),
):
    service.delete(device_id)