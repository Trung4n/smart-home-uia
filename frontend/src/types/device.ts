export type DeviceType = 'light' | 'servo' | 'fan' | 'camera' | 'sensor' | 'other';
export type DeviceTypeEnum = DeviceType;
export type DeviceModeEnum = "auto" | "manual";

export interface Device {
  device_id: number;
  device_name: string;
  device_type: DeviceType;
  pin_number: number;
  location: string;
  device_mode: DeviceModeEnum;
  status: string;
  is_active: boolean;
}

export interface DeviceCreate {
  device_name: string;
  device_type: DeviceType;
  pin_number: number;
  location: string;
  status: string;
  is_active: boolean;
}

export interface DeviceUpdate {
  device_name: string;
  device_type: DeviceType;
  pin_number: number;
  location: string;
  device_mode: DeviceType;
  status: string;
  is_active: boolean;
}

type ActionEnum =
  | "turn_on"
  | "turn_off"
  | "set_color"
  | "set_angle"
  | "set_speed";

type SourceEnum = "app" | "remote" | "auto" | "schedule";

export interface DeviceControlHistory {
  device_control_id: number;
  device_id: number;
  action: ActionEnum;
  value: string;
  source: SourceEnum;
  executed_at: string;
}

export type DeviceControlRequest = {
  device_id: number;
  action: ActionEnum;
  value: string | null;
  source: SourceEnum;
};

export interface LiveSensorData {
  temp: number;
  humi: number;
  light: number;
}