from dataclasses import dataclass

@dataclass
class MQTTConfig:
    host: str = "localhost"
    port: int = 1883
    keepalive: int = 60
    username: str = "admin"
    password: str = "123456"

@dataclass
class DeviceConfig:
    device_id: str = "yolobits"

TOPIC_PUBLISH = "iot-json"      
TOPIC_CONTROL = "iot-control" 

PUBLISH_INTERVAL = 5  