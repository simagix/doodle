var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
	var tokens = req.body.data.match(/image\/(\w+);(\w+),(.*$)/);
    
    require('crypto').randomBytes(4, function(err, buf) {
        var filename = buf.toString('hex')  + '.' + tokens[1];
        console.log('filename: ' + filename);
        var decodedImage = new Buffer(tokens[3], 'base64');
        require('fs').writeFileSync('zfile.png', decodedImage);
    });
    res.json({});
});

module.exports = router;
