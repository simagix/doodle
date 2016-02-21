var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
	var tokens = req.body.data.match(/image\/(\w+);(\w+),(.*$)/);
    require('crypto').randomBytes(4, function(err, buf) {
        var filename = buf.toString('hex')  + '.' + tokens[1];
        var decodedImage = new Buffer(tokens[3], 'base64');
        // require('fs').writeFileSync('signatures/' + filename, decodedImage);
        res.setHeader('Content-Type', 'Application/json');
        res.statusCode = 201;
        res.json({'filename': filename});
        // async send data to mqtt
        if(process.env.MQTT_QUEUE) {
            var mqtt = require('../mqtt/MessageService');
            mqtt.sendMessage(req.body.data, function(err, doc) {
            });
        }
    });
});

module.exports = router;