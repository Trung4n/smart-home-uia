from fastapi import APIRouter, Depends
from app.schemas.sensor_log import *
from app.services import SensorLogService
from app.core.dependencies import *

router = APIRouter(
    tags=["SensorLogs"],
    dependencies=[Depends(get_current_user)]
)


@router.get("/", response_model=list[SensorLogResponse])
def list_sensor_logs(
    sensor_id: int | None = None,
    service: SensorLogService = Depends(get_sensor_log_service),
):
    if sensor_id:
        return service.get_by_sensor_id(sensor_id)
    return service.get_all()