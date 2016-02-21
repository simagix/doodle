var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');
var queue = 'simagix';

client.on('connect', function () {
    client.subscribe(queue);
});

exports.sendMessage = function(data, cb) {
    client.publish(queue, data);
}