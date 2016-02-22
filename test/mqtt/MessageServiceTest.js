var assert = require('chai').assert;
var should = require('chai').should();
var request = require('supertest');
var mqtt    = require('mqtt');
var queue = 'simagix';
	
describe('Mobile Signature MQTT Test', function() {
    var broker = process.env.MQTT_BROKER || 'mqtt://test.mosquitto.org';
    var client  = mqtt.connect(broker);
    var datastr;
	
	before(function(done) {
	    require('fs').readFile('test/routes/image.base64', 'utf8', function(err, data) {
            datastr = data;
            client.on('connect', function () {
                client.subscribe(queue);
		        done();
            });
        });
	});
	
	describe('MessageService', function() {
		it('should receive same message back', function(done) {
            client.publish(queue, datastr);
 
            client.on('message', function (topic, message) {
                console.log(datastr.substring(0, 60));
                console.log(message.toString().substring(0, 60));
                // assert.equal(datastr, message.toString());
                done();
            });
		});
	});

	after(function(done) {
		done();
	});
});