# light_sensor.py
import random
import math
import time


class LightSensor:
    def __init__(self, device_id: str):
        self.device_id = device_id
        self.sensor_type = "LDR"

    def _simulate_daylight_cycle(self) -> float:
        hour = time.localtime().tm_hour + time.localtime().tm_min / 60.0

        angle = math.pi * (hour - 6) / 12
        cycle = max(0.0, math.sin(angle))
        return cycle

    def read(self) -> dict:
        cycle = self._simulate_daylight_cycle()

        base_lux = cycle * 80_000
        noise = random.gauss(0, base_lux * 0.05 + 10) 
        lux = max(0.0, round(base_lux + noise, 2))

        condition = self._classify(lux)

        return {
            "device_id": self.device_id,
            "sensor": self.sensor_type,
            "lux": lux,
            "condition": condition,
            "timestamp": time.time(),
        }
    
    def read_flat(self) -> dict:
        data = self.read()
        return {
            "light": data["lux"],
        }

    def _classify(self, lux: float) -> str:
        if lux < 10:
            return "dark"
        elif lux < 200:
            return "dim"
        elif lux < 2000:
            return "indoor"
        elif lux < 20000:
            return "overcast"
        else:
            return "bright_sunlight"