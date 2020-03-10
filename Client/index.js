import MQTT from 'async-mqtt';
import logger from './logger';


// Assume we have sensor data of vehicle in a json file
import data from './sensor-readings.json'



// function to generate random number between 1 and 1000;
const generateRandomNumber = () => Math.floor(Math.random() * 1000) + 1;
let index = 0;
const numOfRec = data.length - 1;

(async () => {
  try {
    const client = await MQTT.connectAsync('mqtt://test.mosquitto.org');
    logger.info('********** MQTT CONNECTED **********');

    const publishRecord = (data, index) => {
      try {
        const payload = Buffer.from(JSON.stringify(data[index], 'hex'))
        client.publish('mqtt/sensor', payload);
        logger.info(`Data packet ${index} sent`)
      } catch (err) {
        logger.error(err)
      }
    }

    const iterateAndPublish = (index) => {
      const randomNumber = generateRandomNumber();
      setTimeout(() => {
        publishRecord(data, index);
        if (index < numOfRec) {
          iterateAndPublish(++index);
        }
      }, randomNumber)
    };
    iterateAndPublish(index);

  } catch (e) {
    logger.error(e.stack);
    process.exit();
  }
})();