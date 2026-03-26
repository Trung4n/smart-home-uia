import random
import math
import time

class DHT20Sensor:
    def __init__(self, device_id: str, location: str):
        self.device_id = device_id
        self.location = location
        self.sensor_type = "DHT20"

        self._temp = random.uniform(24.0, 28.0)
        self._humidity = random.uniform(55.0, 70.0)

    def _drift(self, current: float, target: float, step: float = 0.3) -> float:
        delta = (target - current) * step
        noise = random.gauss(0, 0.05)
        return round(current + delta + noise, 2)

    def _natural_target_temp(self) -> float:
        hour = time.localtime().tm_hour
        base = 27 + 5 * math.sin(math.pi * (hour - 4) / 12)
        return base

    def _natural_target_humidity(self, temp: float) -> float:
        base = 85 - (temp - 20) * 1.2
        return max(30.0, min(95.0, base))

    def read(self) -> dict:
        target_temp = self._natural_target_temp()
        target_hum = self._natural_target_humidity(target_temp)

        self._temp = self._drift(self._temp, target_temp)
        self._humidity = self._drift(self._humidity, target_hum)

        temp = max(-40.0, min(80.0, self._temp))
        humidity = max(0.0, min(100.0, self._humidity))

        heat_index = self._heat_index(temp, humidity)


        comfort = self._classify_comfort(temp, humidity)

        return {
            "device_id": self.device_id,
            "location": self.location,
            "sensor": self.sensor_type,
            "temperature_c": round(temp, 2),
            "humidity_pct": round(humidity, 2),
            "heat_index_c": round(heat_index, 2),
            "comfort": comfort,
            "timestamp": time.time(),
        }

    def _heat_index(self, T: float, RH: float) -> float:
        if T < 27:
            return T
        hi = (-8.78469475556
              + 1.61139411 * T
              + 2.33854883889 * RH
              - 0.14611605 * T * RH
              - 0.012308094 * T ** 2
              - 0.0164248277778 * RH ** 2
              + 0.002211732 * T ** 2 * RH
              + 0.00072546 * T * RH ** 2
              - 0.000003582 * T ** 2 * RH ** 2)
        return hi

    def _classify_comfort(self, temp: float, humidity: float) -> str:
        if temp < 18:
            return "cold"
        elif temp > 35:
            return "hot"
        elif 20 <= temp <= 26 and 40 <= humidity <= 60:
            return "comfortable"
        elif humidity > 75:
            return "humid"
        elif humidity < 30:
            return "dry"
        else:
            return "moderate"