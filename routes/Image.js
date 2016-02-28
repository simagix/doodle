var express = require('express');
var router = express.Router();
var lwip = require('lwip')
var mqtt = require('../mqtt/MessageService');

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
        if(process.env.MQTT_BROKER) {
            if(decodedImage) {
                lwip.open(decodedImage, 'png', function(err, image){
                    image.resize(60, function(err, image) {
                        calculateColorValues(image, function() {
                            sendOffImage(image, function() {
                                
                            });
                        });
                    });
                });
            }
        }
    });
});

function calculateColorValues(image, cb) {
    var width = image.width();
    var height = image.height();
    var colors = {};
    for(var row = 0; row < width; row++) {
        for(var col = 0; col < height; col++) {
            var doc = image.getPixel(row, col);
            if((doc.r == 255 && doc.g == 255 && doc.b == 255) ||
                (doc.r == 0 && doc.g == 0 && doc.b == 0)) {
                continue;
            }
            
            var hex = getColorHex(doc);
            if(! colors[hex]) {
                colors[hex] = 1;
            } else {
                colors[hex]++;
            }
        }
    }
    mqtt.sendColorValuesMessage(JSON.stringify(colors), function (err, doc) {
    });
    cb();
}

function getColorHex(doc) {
    return '#' + getHex(doc.r) + getHex(doc.g) + getHex(doc.b);
}

function getHex(value) {
    if(value < 16) {
        return '0' + value.toString('16');
    }
    
    return value.toString('16');
}

function sendOffImage(image, cb) {
    image.border(2, 'white', function (err, image) {
        image.border(1, 'black', function (err, image) {
            image.toBuffer('png', function (err, buf) {
                if (!err) {
                    var buf = 'data:image/png;base64,' + buf.toString('base64');
                    mqtt.sendMessage(buf, function (err, doc) {
                        cb();
                    });
                }
            });
        });
    });
}

module.exports = router;
