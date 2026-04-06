import './LiveSensor.css'
interface SensorCardProps {
  icon: string;
  label: string;
  value: number | string | undefined;
  unit: string;
  status: 'NORMAL' | 'WARNING' | 'ALERT';
}

export default function SensorCard({ icon, label, value, unit, status }: SensorCardProps) {
  const statusClass = {
    NORMAL: '',
    WARNING: 'warn-state',
    ALERT: 'alert-state',
  }[status];

  return (
    <div className={`sensor-card ${statusClass}`}>
      <div className="sensor-top">
        <div className="sensor-icon">
          <i className={`fa-solid ${icon}`}></i>
        </div>
        <span className="sensor-name">{label}</span>
      </div>
      <div className="sensor-value-row">
        <span className="sensor-value">{value ?? 'N/A'}</span>
        <span className="sensor-unit">{unit}</span>
      </div>
      <div className="sensor-footer">
        <span className={`sensor-status ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>
    </div>
  );
};