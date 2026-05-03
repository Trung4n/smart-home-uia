import axios from "axios";
import type { DeviceControlHistory } from "../types/device";

const API_URL = import.meta.env.VITE_API_URL;


export async function createDeviceControlHistory(
  deviceId: number,
  deviceName: string,
  action: string,
  value: string | null,
) {
  const response = await axios.post<DeviceControlHistory>(
    `${API_URL}/device-controls`,
    {
      device_id: deviceId,
      device_name: deviceName,
      action,
      value,
      source: "app",
    },
  );

  return response.data;
}