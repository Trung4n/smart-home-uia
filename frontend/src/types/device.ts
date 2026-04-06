type DeviceTypeEnum =
  | "light"
  | "fan"
  | "sensor"
  | "camera"
  | "servo"
  | "other";

type DeviceModeEnum = "auto" | "manual";

export default interface Device {
  device_id: number;
  device_name: string;
  device_type: DeviceTypeEnum;
  pin_number: number;
  location: string;
  device_mode: DeviceModeEnum;
  status: string;
  is_active: boolean;
}