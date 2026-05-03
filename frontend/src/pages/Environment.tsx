import MainEnvironment from "../components/environment/MainEnvironment";
import OverviewBar from "../components/environment/OverviewBar";
import { useWS } from "../hooks/useWebSocket";
import type { LiveSensorData } from "../types/device";

export default function Environment() {
    const sensorData = useWS<LiveSensorData>('/system');

    return (
        <>
            <OverviewBar tempData={sensorData?.temp} humidityData={sensorData?.humi} lightData={sensorData?.light} />
            <MainEnvironment tempData={sensorData?.temp} humidityData={sensorData?.humi} lightData={sensorData?.light} />
        </>
    );
}