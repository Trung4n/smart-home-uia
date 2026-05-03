// Unfinished for now
import './MainDashboard.css'
import { useState } from 'react';
import { Link } from 'react-router';
import { type Device, type LiveSensorData} from '../../types/device';
import { useWS } from '../../hooks/useWebSocket';
import { useAlerts } from '../../hooks/useAlert';
import { useDevices } from '../../hooks/useDevices';
import { getSensorStatus, useThreshold } from '../../hooks/useSensorStatus';
import { useNoti } from '../../services/NotiProvider';
import DeviceItem from './DeviceItem';
import SensorCard from './LiveSensor';
import AlertItem from './AlertItem';
const API_URL = import.meta.env.VITE_API_URL;

export default function MainDashboard() {
  const sensorData = useWS<LiveSensorData>('/system');
  const thresholds = useThreshold();
  const lightStatus = getSensorStatus(thresholds, 1, sensorData?.light);
  const tempStatus = getSensorStatus(thresholds, 2, sensorData?.temp);
  const humStatus = getSensorStatus(thresholds, 3, sensorData?.humi);
  const [devices, setDevices] = useDevices();
  const alerts = useAlerts();
  const { setNotification } = useNoti();
  const [nightModeEnabled, setNightModeEnabled] = useState(false);
  const [ecoModeEnabled, setEcoModeEnabled] = useState(false);
  const lightDevices = devices.filter(d => d.device_type === 'light');
  const doorDevices = devices.filter(d => d.device_type === 'servo');
  const lightsOnCount = lightDevices.filter(d => d.is_active).length;
  const doorsLockedCount = doorDevices.filter(d => !d.is_active).length;
  const autoModeCount = devices.filter(d => d.device_mode === 'auto').length;
  const allLightsOn = lightDevices.length > 0 && lightsOnCount === lightDevices.length;
  const allDoorsLocked = doorDevices.length > 0 && doorsLockedCount === doorDevices.length;
  const allAutoMode = devices.length > 0 && autoModeCount === devices.length;

  const toggleAllLights = async (devices: Device[]) => {
    const lightDevices = devices.filter(d => d.device_type === 'light');
    if (!lightDevices.length) return;
    const nextIsActive = !lightDevices.every(d => d.is_active);
    await Promise.all(lightDevices.map(d => fetch(`${API_URL}/devices/${d.device_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...d, is_active: nextIsActive })
    })));
    setNotification(nextIsActive ? 'All lights turned on' : 'All lights turned off');
    setDevices((prev) => prev.map(d => d.device_type === 'light' ? { ...d, is_active: nextIsActive } : d));
  };
  const toggleAllDoors = async (devices: Device[]) => {
    const doorDevices = devices.filter(d => d.device_type === 'servo');
    if (!doorDevices.length) return;
    const nextIsActive = doorDevices.every(d => !d.is_active);
    await Promise.all(doorDevices.map(d => fetch(`${API_URL}/devices/${d.device_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...d, is_active: nextIsActive })
    })));
    setNotification(nextIsActive ? 'All doors unlocked' : 'All doors locked');
    setDevices((prev) => prev.map(d => d.device_type === 'servo' ? { ...d, is_active: nextIsActive } : d));
  }
  const toggleAutoMode = async (devices: Device[]) => {
    const nextDeviceMode = devices.every(d => d.device_mode === 'auto') ? 'manual' : 'auto';
    await Promise.all(devices.map(d => fetch(`${API_URL}/devices/${d.device_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...d, device_mode: nextDeviceMode })
    })));
    setNotification(nextDeviceMode === 'auto' ? 'Auto mode enabled' : 'Manual mode enabled');
    setDevices((prev) => prev.map(d => ({ ...d, device_mode: nextDeviceMode })));
  }
  const toggleNightMode = () => {
    setNightModeEnabled((prev) => !prev);
    setNotification(nightModeEnabled ? 'Night mode disabled' : 'Night mode enabled');
  }
  const toggleEcoMode = () => {
    setEcoModeEnabled((prev) => !prev);
    setNotification(ecoModeEnabled ? 'Eco mode disabled' : 'Eco mode enabled');
  }
  return (
    <div className="main-content">
      <section>
        <div className="section-head">
          <div className="section-title">Live Sensors</div>
          <span className="live-dot">Live</span>
        </div>

        <div className="sensor-grid">
          <SensorCard
            icon="fa-temperature-half"
            label="Temperature"
            value={sensorData?.temp}
            unit="°C"
            status={tempStatus}
          />

          <SensorCard
            icon="fa-droplet"
            label="Humidity"
            value={sensorData?.humi}
            unit="%"
            status={humStatus}
          />

          <SensorCard
            icon="fa-sun"
            label="Light Level"
            value={sensorData?.light}
            unit="lux"
            status={lightStatus}
          />
        </div>
      </section>

      <div className="mid-row">
        <div className="device-panel">
          <div className="section-head">
            <div className="section-title">Device Status</div>
            <span className="section-meta" id="devices-online">{
              devices.filter(d => d.status === 'online').length}/{devices.length} Online
            </span>
          </div>

          <div className="device-list">
            {devices.slice(0, 6).map((device) => (
              <DeviceItem
                key={device.device_id}
                device={device}
                setDevices={setDevices}
              />
            ))}
          </div>
          <Link to="/devices" className="btn-view-all">
            <i
              className="fa-solid fa-list"
              style={{ marginRight: '5px', fontSize: '9px' }}
            ></i>
            View All Devices
          </Link>
        </div>

        <div className="notif-panel">
          <div className="section-head">
            <div className="section-title">Recent Alerts</div>
            <span className="section-meta">Last 24 hours</span>
          </div>

          <div className='notif-list'>
            {alerts.slice(-8).map((alert) => (
              <AlertItem
                key={alert.notification_id}
                type={alert.notification_type}
                msg={alert.title}
                time={alert.created_at}
              />
            ))}
          </div>

          <Link to="/notifications" className="btn-view-all">
            <i
              className="fa-solid fa-list"
              style={{ marginRight: '5px', fontSize: '9px' }}
            ></i>
            View All Notifications
          </Link>
        </div>
      </div>

      <section>
        <div className="section-head">
          <div className="section-title">Quick Actions</div>
          <span className="section-meta">Tap to toggle</span>
        </div>

        <div className="quick-actions-grid">
          <button
            className={`qa-btn ${allLightsOn ? 'active-qa danger-qa' : ''}`}
            data-qa="all-lights-off"
            onClick={() => toggleAllLights(devices)}
          >
            <div className="qa-icon-box">
              <i className="fa-solid fa-power-off"></i>
            </div>
            <span className="qa-label">{allLightsOn ? 'Turn All Lights Off' : 'Turn All Lights On'}</span>
            <span className="qa-state">{lightsOnCount}/{lightDevices.length} ON</span>
          </button>

          <button
            className={`qa-btn ${allDoorsLocked ? 'active-qa danger-qa' : ''}`}
            data-qa="lock-door"
            onClick={() => toggleAllDoors(devices)}
          >
            <div className="qa-icon-box"><i className="fa-solid fa-lock"></i></div>
            <span className="qa-label">{allDoorsLocked ? 'Unlock All Doors' : 'Lock All Doors'}</span>
            <span className="qa-state">{doorsLockedCount}/{doorDevices.length} LOCKED</span>
          </button>

          <button 
            className={`qa-btn ${allAutoMode ? 'active-qa' : ''}`} 
            data-qa="auto-mode" 
            onClick={() => toggleAutoMode(devices)}>
            <div className="qa-icon-box"><i className="fa-solid fa-gears"></i></div>
            <span className="qa-label">{allAutoMode ? 'Manual Mode' : 'Auto Mode'}</span>
            <span className={`qa-state ${allAutoMode ? 'on' : ''}`}>{autoModeCount}/{devices.length} AUTO</span>
          </button>

          <button 
            className={`qa-btn ${nightModeEnabled ? 'active-qa' : ''}`}
            data-qa="night-mode"
            onClick={() => toggleNightMode()}
          >
            <div className="qa-icon-box"><i className="fa-solid fa-moon"></i></div>
            <span className="qa-label">{nightModeEnabled ? 'Disable Night Mode' : 'Enable Night Mode'}</span>
            <span className={`qa-state ${nightModeEnabled ? 'on' : ''}`}>{nightModeEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button 
            className={`qa-btn ${ecoModeEnabled ? 'active-qa' : ''}`}
            data-qa="eco-mode"
            onClick={() => toggleEcoMode()}
          >
            <div className="qa-icon-box"><i className="fa-solid fa-leaf"></i></div>
            <span className="qa-label">{ecoModeEnabled ? 'Disable Eco Mode' : 'Enable Eco Mode'}</span>
            <span className={`qa-state ${ecoModeEnabled ? 'on' : ''}`}>{ecoModeEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </section>
    </div>
  )
}