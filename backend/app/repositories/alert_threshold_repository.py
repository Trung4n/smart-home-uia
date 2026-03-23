from app.repositories import BaseRepository

class AlertThresholdRepository(BaseRepository):
    def __init__(self, db):
        super().__init__(db, "alert_thresholds")

    