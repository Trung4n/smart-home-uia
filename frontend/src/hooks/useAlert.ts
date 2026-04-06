import { useState, useEffect } from 'react';
import { type Alert } from '../types/alert';
const API_URL = import.meta.env.VITE_API_URL;
export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const result = await fetch(`${API_URL}/notifications`);
        const data = await result.json();
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };
    fetchAlerts();
  }, [])
  return alerts;
}