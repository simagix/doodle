var assert = require('chai').assert;
var should = require('chai').should();
var request = require('supertest');var mqtt    = require('mqtt');
var queue = 'simagix';
	
describe('Doodle MQTT Test', function() {
    process.env.MQTT_QUEUE = 'mqtt://test.mosquitto.org';
    var client  = mqtt.connect(process.env.MQTT_QUEUE);
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
                assert.equal(datastr, message);
                done();
            });
		});
	});

	after(function(done) {
		done();
	});
});