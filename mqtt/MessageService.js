var mqtt    = require('mqtt');
console.log('connecting to ' + process.env.MQTT_BROKER);
var client  = mqtt.connect(process.env.MQTT_BROKER);
var queue_simagix = 'simagix';
var queue_simagix_color = 'simagix_color';

exports.sendMessage = function(data, cb) {
    client.publish(queue_simagix, data);
}

exports.sendColorValuesMessage = function(data, cb) {
    client.publish(queue_simagix_color, data);
}
