var mqtt    = require('mqtt');
console.log('connecting to ' + process.env.MQTT_BROKER);
var client  = mqtt.connect(process.env.MQTT_BROKER);
var queue_simagix = 'simagix';
var queue_simagix_color = 'simagix_color';

client.on('connect', function () {
    if(process.env.ENV == 'dev') {
        console.log('connected to ' + process.env.MQTT_BROKER);
    }
});

exports.sendMessage = function(data, cb) {
    if(process.env.ENV == 'dev') {
        console.log('publishing ' + data);
    }
    client.publish(queue_simagix, data);
}

exports.sendColorValuesMessage = function(data, cb) {
    if(process.env.ENV == 'dev') {
        console.log('publishing ' + data);
    }
    client.publish(queue_simagix_color, data);
}
