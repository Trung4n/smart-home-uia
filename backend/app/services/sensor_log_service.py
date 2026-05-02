from app.repositories import SensorLogRepository
from app.services.sensor_service import SensorService
from app.schemas.sensor_log import SensorLogCreate
from app.core.enums import SensorTypeEnum
class SensorLogService:
    def __init__(self, repo: SensorLogRepository, sensor: SensorService):
        self.repo = repo
        self.sensor = sensor

    def create(self, payload: SensorLogCreate) -> dict:
        KEY_TO_SENSOR_TYPE = {
            "temp": SensorTypeEnum.TEMPERATURE,
            "humi": SensorTypeEnum.HUMIDITY,
            "light": SensorTypeEnum.LIGHT,
        }
        sensor = self.sensor.get_by_sensor_type(KEY_TO_SENSOR_TYPE[payload.key])

        data = {
            "sensor_id": sensor['sensor_id'],
            "value": payload.value,
            "is_valid": True if payload.value >= sensor["min_valid"] and payload.value <= sensor["max_valid"] else False
        }

        return self.repo.create(data), sensor

    def get_all(self) -> list:
        return self.repo.get_all()

    def get_by_sensor_id(self, sensor_id: int) -> list:
        return self.repo.get_by_sensor_id(sensor_id)
    
