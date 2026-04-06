type DeviceTypeEnum =
  | "light"
  | "fan"
  | "sensor"
  | "camera"
  | "servo"
  | "other";

type DeviceModeEnum = "auto" | "manual";

export  interface Device {
  device_id: number;
  device_name: string;
  device_type: DeviceTypeEnum;
  pin_number: number;
  location: string;
  device_mode: DeviceModeEnum;
  status: string;
  is_active: boolean;
}

export interface LiveSensorData {
  type: string;
  device_id: string;
  location: string;
  sensor: string;
  timestamp: number;
}
export interface LightData extends LiveSensorData {
  lux: number;
  condition: string;
}
export interface DHT20Data extends LiveSensorData {
  temperature_c: number;
  heat_index_c: number;
  comfort: string;
  humidity_pct: number;
}