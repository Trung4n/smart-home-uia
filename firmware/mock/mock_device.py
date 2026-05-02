import json
import time
import threading
import logging

import paho.mqtt.client as mqtt

from .config import MQTTConfig, DeviceConfig, TOPIC_PUBLISH, TOPIC_CONTROL, PUBLISH_INTERVAL
from .sensors import LightSensor, DHT20Sensor

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

mqtt_cfg = MQTTConfig()
device_cfg = DeviceConfig()


def on_connect(client, userdata, flags, rc):
    codes = {0: "Connected", 1: "Bad protocol", 2: "ID rejected",
             3: "Broker unavailable", 4: "Bad credentials", 5: "Not authorised"}
    if rc == 0:
        log.info(f"MQTT broker — {codes[rc]}")
        # Subscribe kênh nhận lệnh ngay khi kết nối thành công
        client.subscribe(TOPIC_CONTROL, qos=1)
        log.info(f"Subscribed to control topic: {TOPIC_CONTROL}")
    else:
        log.error(f"MQTT connect failed: {codes.get(rc, 'Unknown')}")


def on_disconnect(client, userdata, rc):
    if rc != 0:
        log.warning("Unexpected disconnect. Reconnecting...")


def on_message(client, userdata, msg):
    """Xử lý lệnh điều khiển nhận từ backend qua iot-control."""
    try:
        payload = json.loads(msg.payload.decode())
        log.info(f"[Control] Received: {payload}")
        # TODO: xử lý lệnh, ví dụ bật/tắt relay, đổi ngưỡng cảnh báo...
    except Exception as e:
        log.error(f"[Control] Failed to parse message: {e}")


def on_publish(client, userdata, mid):
    log.debug(f"Message published (mid={mid})")


def sensor_loop(client: mqtt.Client, stop_event: threading.Event):
    light_sensor = LightSensor(
        device_id=device_cfg.device_id,
    )
    dht20_sensor = DHT20Sensor(
        device_id=device_cfg.device_id,
    )
    log.info(f"Sensor loop starting -> publish topic: {TOPIC_PUBLISH}")

    while not stop_event.is_set():
        try:
            dht_data   = dht20_sensor.read_flat()  
            light_data = light_sensor.read_flat()

            payload = {
                "temp":  dht_data["temp"],
                "humi":  dht_data["humi"],
                "light": light_data["light"],
            }

            client.publish(TOPIC_PUBLISH, json.dumps(payload), qos=0)
            log.info(
                f"[Publish] temp={payload['temp']}°C  "
                f"humi={payload['humi']}%  "
                f"light={payload['light']:.1f} lux"
            )
        except Exception as e:
            log.error(f"[Sensor] Error: {e}")

        stop_event.wait(PUBLISH_INTERVAL)


def run():
    client = mqtt.Client(
        client_id=f"mock_{device_cfg.device_id}",
        clean_session=True,
    )
    client.on_connect  = on_connect
    client.on_disconnect = on_disconnect
    client.on_message  = on_message
    client.on_publish  = on_publish

    client.username_pw_set(mqtt_cfg.username, mqtt_cfg.password)

    log.info(f"Connecting to broker {mqtt_cfg.host}:{mqtt_cfg.port} ...")
    client.connect(mqtt_cfg.host, mqtt_cfg.port, mqtt_cfg.keepalive)
    client.loop_start()

    time.sleep(1)  # chờ on_connect chạy xong

    stop_event = threading.Event()
    t = threading.Thread(target=sensor_loop, args=(client, stop_event), daemon=True)
    t.start()

    log.info("Mock firmware running. Press Ctrl+C to stop.")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        log.info("Shutting down...")
        stop_event.set()
        time.sleep(0.5)
        client.loop_stop()
        client.disconnect()
        log.info("Disconnected.")