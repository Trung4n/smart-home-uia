import { useState, useEffect } from 'react';
import { type Device } from '../types/device';
const API_URL = import.meta.env.VITE_API_URL;
export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const result = await fetch(`${API_URL}/devices`);
        const data = await result.json();
        setDevices(data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };
    fetchDevices();
  }, [])
  return devices;
}