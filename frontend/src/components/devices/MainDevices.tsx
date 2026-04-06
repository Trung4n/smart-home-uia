import type Device from "../../types/device";
import "./Devices.css";
export default function MainDevices({ devices }: { devices: Device[] }) {
  return (
    <div className="devices-layout">
      <div className="device-grid-wrap">
        <div className="grid-head">
          <div className="grid-title">{} Devices</div>
          <div className="device-grid" id="device-grid">
            {devices.map((d) => (
              <div
                className="dev-card is-on selected"
                data-id="d1"
                data-type="light"
              >
                <div className="card-head">
                  <div className="card-icon">
                    <i className="fa-solid fa-lightbulb"></i>
                  </div>
                  <div className="card-meta">
                    <div className="card-name">{d.device_name}</div>
                    <div className="card-room">
                      <i
                        className="fa-solid fa-location-dot"
                        style={{ fontSize: "8px", color: "var(--muted)" }}
                      ></i>
                      {d.location}
                    </div>
                  </div>
                  <span className="card-status online">{d.is_active ? "Online" : "Offline"}</span>
                </div>

                <div className="card-controls">
                  <div className="color-row">
                    <span className="color-label">Color</span>
                    <div className="color-swatch-row">
                      <div
                        className="color-swatch active"
                        style={{ background: "#ffffff" }}
                        data-color="#FFFFFF"
                        title="White"
                      ></div>
                      <div
                        className="color-swatch"
                        style={{ background: "#fff3cd" }}
                        data-color="#FFF3CD"
                        title="Warm White"
                      ></div>
                      <div
                        className="color-swatch"
                        style={{ background: "#facc15" }}
                        data-color="#FACC15"
                        title="Yellow"
                      ></div>
                      <div
                        className="color-swatch"
                        style={{ background: "#2563eb" }}
                        data-color="#2563EB"
                        title="Blue"
                      ></div>
                      <div
                        className="color-swatch"
                        style={{ background: "#ef4444" }}
                        data-color="#EF4444"
                        title="Red"
                      ></div>
                      <div
                        className="color-swatch"
                        style={{ background: "#34d399" }}
                        data-color="#34D399"
                        title="Green"
                      ></div>
                      <input
                        type="color"
                        className="color-picker-input"
                        title="Custom color"
                        value="#FFFFFF"
                      />
                    </div>
                    <div
                      className="color-preview"
                      id="d1-color-preview"
                      style={{ background: "#ffffff" }}
                    ></div>
                  </div>
                </div>

                <div className="card-toggle-row">
                  <span className="card-toggle-label">Power</span>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      className="dev-power-toggle"
                      data-id="d1"
                      checked
                    />
                    <div className="toggle-track"></div>
                    <div className="toggle-thumb"></div>
                  </label>
                </div>

                <div className="auto-toggle-row">
                  <span className="auto-toggle-label">
                    <i className="fa-solid fa-gears"></i> Auto Mode
                  </span>
                  <label className="auto-toggle">
                    <input
                      type="checkbox"
                      className="dev-auto-toggle"
                      data-id="d1"
                    />
                    <div className="auto-toggle-track"></div>
                    <div className="auto-toggle-thumb"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="history-panel"></div>
    </div>
  );
}
