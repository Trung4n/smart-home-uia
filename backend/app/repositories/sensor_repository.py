from app.repositories import BaseRepository
from app.core.enums import SensorTypeEnum
class SensorRepository(BaseRepository):

    def __init__(self, db):
        super().__init__(db, "sensors")

    def get_by_sensor_type(self, sensor_type: SensorTypeEnum) -> dict:
        res = self._execute(
            self._table()
            .select("*")
            .eq("sensor_type", sensor_type.value)
            .limit(1)
        )

        return res.data[0]
