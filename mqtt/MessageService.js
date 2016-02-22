var mqtt    = require('mqtt');
console.log('connecting to ' + process.env.MQTT_BROKER);
var client  = mqtt.connect(process.env.MQTT_BROKER);
var queue = 'simagix';

exports.sendMessage = function(data, cb) {
    client.publish(queue, data);
}