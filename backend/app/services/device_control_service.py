from app.schemas.device_control import *
from app.repositories import DeviceControlRepository
from app.core.exceptions import *

from app.utils.logger import get_logger

logger = get_logger(__name__)

class DeviceControlService:
    def __init__(self, repo: DeviceControlRepository):
        self.repo = repo
        logger.info("DeviceControlService initialized with DeviceControlRepository")

    def get_by_device_id(self, device_id: int) -> list:
        return self.repo.get_by_device_id(device_id)
    
    def create(self, payload: DeviceControlCreate) -> dict:
        return self.repo.create(payload.model_dump())
    
    def get_all(self) -> list:
        return self.repo.get_all()