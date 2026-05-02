from app.repositories import BaseRepository


class AutomationRuleRepository(BaseRepository):
    def __init__(self, db):
        super().__init__(db, "automation_rules")

    def get_by_sensor_id(self, sensor_id: int) -> list:
        return self._execute(self._table().select("*").eq("trigger_type", "sensor").eq("sensor_id", sensor_id)).data