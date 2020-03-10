import MQTT from 'async-mqtt';
import logger from './logger';

(async () => {
  try {
    const client = await MQTT.connectAsync('mqtt://test.mosquitto.org');
    logger.info('********** MQTT CONNECTED **********');
    await client.subscribe('mqtt/sensor')

    const logPayload = (topic, payload) => {
      if (topic === 'mqtt/sensor') {
        process.stdout.write(payload + '\n');
      }
    }
    client.on('message', logPayload)

  } catch (e) {
    logger.error(e.stack);
    process.exit();
  }
})();


