import type Device from "../../types/device";

export default function FilterBar({ devices }: { devices: Device[] }) {
  return (
    <div className="filter-bar">
      <span className="filter-label">Filter:</span>
      <button className="filter-btn active" data-filter="all">
        <i className="fa-solid fa-border-all"></i> All
        <span className="filter-count" id="count-all">
          {devices.length}
        </span>
      </button>
      <button className="filter-btn" data-filter="light">
        <i className="fa-solid fa-lightbulb"></i> Light
        <span className="filter-count" id="count-light">
          {devices.filter((d) => d.device_type === "light").length}
        </span>
      </button>
      <button className="filter-btn" data-filter="fan">
        <i className="fa-solid fa-fan"></i> Fan
        <span className="filter-count" id="count-fan">
          {devices.filter((d) => d.device_type === "fan").length}
        </span>
      </button>
      <button className="filter-btn" data-filter="sensor">
        <i className="fa-solid fa-microchip"></i> Sensor
        <span className="filter-count" id="count-sensor">
          {devices.filter((d) => d.device_type === "sensor").length}
        </span>
      </button>
      <button className="filter-btn" data-filter="camera">
        <i className="fa-solid fa-camera"></i> Camera
        <span className="filter-count" id="count-camera">
          {devices.filter((d) => d.device_type === "camera").length}
        </span>
      </button>
      <button className="filter-btn" data-filter="servo">
        <i className="fa-solid fa-gear"></i> Servo
        <span className="filter-count" id="count-servo">
          {devices.filter((d) => d.device_type === "servo").length}
        </span>
      </button>
      <button className="filter-btn" data-filter="other">
        <i className="fa-solid fa-plug"></i> Other
        <span className="filter-count" id="count-other">
          {devices.filter((d) => d.device_type === "other").length}
        </span>
      </button>

      <div className="filter-spacer"></div>

      <div className="devices-summary">
        <div className="summary-pill online">
          <i className="fa-solid fa-circle-dot" style={{ fontSize: '8px' }}></i> {devices.filter((d) => d.is_active).length}
          {' '}Online
        </div>
        <div className="summary-pill offline">
          <i className="fa-solid fa-circle" style={{ fontSize: '8px' }}></i> {devices.filter((d) => !d.is_active).length}
          {' '}Offline
        </div>
      </div>
    </div>
  );
}
