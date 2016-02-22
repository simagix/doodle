var mqtt    = require('mqtt');
var client  = mqtt.connect(process.env.MQTT_BROKER);
var queue = 'simagix';

client.on('connect', function () {
    client.subscribe(queue);
});

exports.sendMessage = function(data, cb) {
    client.publish(queue, data);
}