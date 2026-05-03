import { getSensorStatus, useThreshold } from "../../hooks/useSensorStatus";
import { envStatusValue } from "../../utils/formatters";
import "./environment.css";

export default function OverviewBar({
  tempData,
  humidityData,
  lightData,
}: {
  tempData: number | undefined;
  humidityData: number | undefined;
  lightData: number | undefined;
}) {
  const thresholds = useThreshold();
  const lightStatus = getSensorStatus(thresholds, 1, lightData);
  const tempStatus = getSensorStatus(thresholds, 2, tempData);
  const humStatus = getSensorStatus(thresholds, 3, humidityData);
  return (
    <div className="overview-bar">
      <div className="ov-seg temp-seg">
        <div className="ov-icon">
          <i className="fa-solid fa-temperature-half"></i>
        </div>
        <span className="ov-label">Temp</span>
        <span className="ov-val" id="ov-temp">
          {tempData ? tempData : "N/A"}
        </span>
        <span className="ov-unit">°C</span>
        <span className={`ov-status ${tempStatus.toLowerCase()} ${tempStatus === "ALERT" ? "ov-blink" : ""}`} id="ov-temp-status">
          {envStatusValue(tempStatus)}
        </span>
        <div className="update-dot"></div>
      </div>

      <div className="ov-seg hum-seg">
        <div className="ov-icon">
          <i className="fa-solid fa-droplet"></i>
        </div>
        <span className="ov-label">Humidity</span>
        <span className="ov-val" id="ov-hum">
          {humidityData? humidityData : "N/A"}
        </span>
        <span className="ov-unit">%</span>
        <span className={`ov-status ${humStatus.toLowerCase()} ${humStatus === "ALERT" ? "ov-blink" : ""}`} id="ov-hum-status">
          {envStatusValue(humStatus)}
        </span>
        <div className="update-dot"></div>
      </div>

      <div className="ov-seg light-seg">
        <div className="ov-icon">
          <i className="fa-solid fa-sun"></i>
        </div>
        <span className="ov-label">Light</span>
        <span className="ov-val" id="ov-light">
          {lightData ? lightData : "N/A"}
        </span>
        <span className="ov-unit">lux</span>
        <span className={`ov-status ${lightStatus.toLowerCase()} ${lightStatus === "ALERT" ? "ov-blink" : ""}`} id="ov-light-status">
          {envStatusValue(lightStatus)}
        </span>
        <div className="update-dot"></div>
      </div>
    </div>
  );
}
