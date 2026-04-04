export interface Device {
  device_id: number;
  device_name: string;
  device_type: string;
  pin_number: number;
  location: string;
  device_mode: string;
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