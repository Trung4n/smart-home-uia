import { useEffect, useState } from "react";
import FilterBar from "../../components/devices/FilterBar";
import MainDevices from "../../components/devices/MainDevices";
import HomeLayout from "../../components/layout/HomeLayout";
import type Device from "../../types/device";
import axios from "axios";

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("/api/devices");        
        setDevices(response.data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    fetchDevices();
  }, []);
  return (
    <HomeLayout headerName="Devices" sub="— Control & Manage">
      <FilterBar devices={devices} />
      <MainDevices devices={devices} />
    </HomeLayout>
  );
}
