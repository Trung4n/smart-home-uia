from fastapi import APIRouter, Depends, status
from app.schemas.alert_threshold import AlertThresholdUpdate, AlertThresholdResponse
from app.services import AlertThresholdService
from app.core.dependencies import *

router = APIRouter(
    tags=["Alert Thresholds"],
    dependencies=[Depends(get_current_user)]
)

@router.get("/", response_model=list[AlertThresholdResponse])
def list_alert_thresholds(
    service: AlertThresholdService = Depends(get_alert_threshold_service),
):
    return service.get_all()

@router.get("/{alert_threshold_id}", response_model=AlertThresholdResponse)
def get_alert_threshold(
    alert_threshold_id: int,
    service: AlertThresholdService = Depends(get_alert_threshold_service),
):
    return service.get_by_id(alert_threshold_id)

@router.put("/{alert_threshold_id}", response_model=AlertThresholdResponse)
def update_alert_threshold(
    alert_threshold_id: int, 
    payload: AlertThresholdUpdate,
    service: AlertThresholdService = Depends(get_alert_threshold_service)
):
    return service.update(alert_threshold_id, payload)