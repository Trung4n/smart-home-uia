# Base
class AppException(Exception):
    def __init__(self, message: str):
        self.message = message
        super().__init__(message)

# 404 
class NotFoundException(AppException):
    pass

class DeviceNotFoundException(NotFoundException):
    def __init__(self, device_id: int):
        super().__init__(f"Device {device_id} not found")

# 400 
class ValidationException(AppException):
    pass

class DuplicateDeviceException(ValidationException):
    def __init__(self, name: str):
        super().__init__(f"Device '{name}' already exists")

# 500
class DatabaseException(AppException):
    pass