var should = require('chai').should();
var request = require('supertest');
	
describe('Doodle Image API Test', function() {
	var url = 'http://localhost:3000';
    var doc = {};
	
	before(function(done) {
		var app = require('../../app');
        require('http').createServer(app).listen(3000);
	    require('fs').readFile('test/routes/image.base64', 'utf8', function(err, data) {
            doc = JSON.parse(data);
		    done();
        });
	});
	
	describe('Image', function() {
		it('should return status 201', function(done) {
			request(url)
				.post('/image')
				.send(doc)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.should.have.property('status').equal(201);
					done();
				});
		});
	});

	after(function(done) {
		done();
	});
});