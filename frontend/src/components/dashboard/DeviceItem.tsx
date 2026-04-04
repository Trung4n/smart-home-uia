import './DeviceItem.css'
// const API_URL = import.meta.env.VITE_API_URL;
interface DeviceProps {
  name: string;
  location: string;
  type: string;
  isOn: boolean;
}
export default function DeviceItem({ name, location, type, isOn }: DeviceProps) {

  const icon = {
    'light': 'fa-lightbulb',
    'fan': 'fa-fan',
    'ac': 'fa-snowflake',
    'door': 'fa-door-closed',
    'camera': 'fa-video',
  }[type] || 'fa-cubes';
  const onToggle = async () => {
    return ;
  }
  return (
    <div className={`device-item ${isOn ? 'on' : ''}`}>
      <div className="device-icon-box">
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div className="device-info">
        <div className="device-name">
          {name}
          <span className={`device-badge ${isOn ? 'on-badge' : 'off-badge'}`}>
            {isOn ? 'On' : 'Off'}
          </span>
        </div>
        <div className="device-sub">{location}</div>
      </div>
      <label className="toggle">
        <input
          type="checkbox"
          checked={isOn}
          onChange={onToggle}
          className="device-toggle"
        />
        <div className="toggle-track"></div>
        <div className="toggle-thumb"></div>
      </label>
    </div>
  );
};