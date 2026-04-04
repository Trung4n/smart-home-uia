export interface Alert {
  notification_id: number;
  device_id: number | null;
  title: string;
  description: string;
  notification_type: string;
  severity: 'low' | 'medium' | 'high';
  is_read: boolean;
  created_at: string;
}
export interface Threshold {
  alert_threshold_id: number;
  sensor_id: number;
  min_threshold: number;
  max_threshold: number;
  is_active: boolean;
}