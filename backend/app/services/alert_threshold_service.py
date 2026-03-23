from app.schemas.alert_threshold import AlertThresholdUpdate
from app.repositories import AlertThresholdRepository
from app.core.exceptions import *

from app.utils.logger import get_logger
logger = get_logger(__name__)

class AlertThresholdService:
    def __init__(self, repo: AlertThresholdRepository):
        self.repo = repo
        logger.info("AlertThresholdService initialized with AlertThresholdRepository")

    def get_by_id(self, alert_threshold_id: int) -> dict:
        alert_threshold = self.repo.get_by_id(alert_threshold_id)
        if not alert_threshold:
            raise AlertThresholdNotFoundException(alert_threshold_id)
        return alert_threshold
    
    def get_all(self) -> list:
        return self.repo.get_all()
    
    def update(self, alert_threshold_id: int, payload: AlertThresholdUpdate) -> dict:
        self.get_by_id(alert_threshold_id)
        return self.repo.update(alert_threshold_id, payload.model_dump(exclude_unset=True))