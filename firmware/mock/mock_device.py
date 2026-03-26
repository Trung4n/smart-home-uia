import json
import time
import threading
import logging

import paho.mqtt.client as mqtt

from .config import MQTTConfig, DeviceConfig, TOPIC_LIGHT, TOPIC_DHT20, TOPIC_STATUS
from .config import PUBLISH_INTERVAL_LIGHT, PUBLISH_INTERVAL_DHT20
from .sensors import LightSensor, DHT20Sensor

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

mqtt_cfg = MQTTConfig()
device_cfg = DeviceConfig()

TOPIC_LIGHT_FULL = TOPIC_LIGHT.format(light_id=device_cfg.light_id)
TOPIC_DHT20_FULL = TOPIC_DHT20.format(dht20_id=device_cfg.dht20_id)
TOPIC_STATUS_FULL = TOPIC_STATUS.format(device_id=device_cfg.device_id)

def on_connect(client, userdata, flags, rc):
    codes = {
        0: "Connected",
        1: "Bad protocol version",
        2: "Client ID rejected",
        3: "Broker unavailable",
        4: "Bad credentials",
        5: "Not authorised",
    }
    if rc == 0:
        log.info(f"MQTT broker — {codes[rc]}")
        _publish_status(client, "online")
    else:
        log.error(f"MQTT connect failed: {codes.get(rc, 'Unknown')}")

def on_disconnect(client, userdata, rc):
    if rc != 0:
        log.warning("Unexpected disconnect. Reconnecting...")

def on_publish(client, userdata, mid):
    log.debug(f"Message published (mid={mid})")

def _publish_status(client: mqtt.Client, status: str):
    payload = {
        "device_id": device_cfg.device_id,
        "status": status,
        "timestamp": time.time(),
    }
    client.publish(TOPIC_STATUS_FULL, json.dumps(payload), qos=1, retain=True)

def _publish(client: mqtt.Client, topic: str, data: dict, qos: int = 0):
    payload = json.dumps(data)
    result = client.publish(topic, payload, qos=qos)
    return result

def light_sensor_loop(client: mqtt.Client, stop_event: threading.Event):
    sensor = LightSensor(
        device_id=device_cfg.light_id,
        location=device_cfg.light_location,
    )
    log.info(f"[Light] Starting -> topic: {TOPIC_LIGHT_FULL}")

    while not stop_event.is_set():
        try:
            data = sensor.read()
            _publish(client, TOPIC_LIGHT_FULL, data)
            log.info(f"[Light] lux={data['lux']:.1f}  cond={data['condition']}")
        except Exception as e:
            log.error(f"[Light] Error: {e}")

        stop_event.wait(PUBLISH_INTERVAL_LIGHT)

def dht20_sensor_loop(client: mqtt.Client, stop_event: threading.Event):
    sensor = DHT20Sensor(
        device_id=device_cfg.dht20_id,
        location=device_cfg.dht20_location,
    )
    log.info(f"[DHT20] Starting -> topic: {TOPIC_DHT20_FULL}")

    while not stop_event.is_set():
        try:
            data = sensor.read()
            _publish(client, TOPIC_DHT20_FULL, data)
            log.info(
                f"[DHT20] temp={data['temperature_c']}°C  "
                f"hum={data['humidity_pct']}%  "
                f"comfort={data['comfort']}"
            )
        except Exception as e:
            log.error(f"[DHT20] Error: {e}")

        stop_event.wait(PUBLISH_INTERVAL_DHT20)

def run():
    client = mqtt.Client(
        client_id=f"mock_{device_cfg.device_id}",
        clean_session=True,
    )
    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.on_publish = on_publish

    will_payload = json.dumps({
        "device_id": device_cfg.device_id,
        "status": "offline",
        "timestamp": time.time(),
    })
    client.will_set(TOPIC_STATUS_FULL, will_payload, qos=1, retain=True)

    log.info(f"Connecting to broker {mqtt_cfg.host}:{mqtt_cfg.port} ...")
    client.connect(mqtt_cfg.host, mqtt_cfg.port, mqtt_cfg.keepalive)
    client.loop_start()

    time.sleep(1)

    stop_event = threading.Event()
    threads = [
        threading.Thread(target=light_sensor_loop, args=(client, stop_event), daemon=True),
        threading.Thread(target=dht20_sensor_loop, args=(client, stop_event), daemon=True),
    ]

    for t in threads:
        t.start()

    log.info("Mock firmware running. Press Ctrl+C to stop.")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        log.info("Shutting down...")
        stop_event.set()
        _publish_status(client, "offline")
        time.sleep(0.5)
        client.loop_stop()
        client.disconnect()
        log.info("Disconnected.")
