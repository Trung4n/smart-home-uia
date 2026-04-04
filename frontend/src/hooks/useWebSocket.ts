import { useEffect, useState } from 'react';
const VITE_WS_URL = import.meta.env.VITE_WS_URL;
export function useWS<T>(path: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`${VITE_WS_URL}${path}`);
    socket.onmessage = (event) => setData(JSON.parse(event.data));
    
    return () => socket.close();
  }, [path]);

  return data;
}