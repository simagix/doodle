var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var hostname = require('os').hostname();
    res.setHeader('Content-Type', 'Application/json');
    res.statusCode = 201;
    res.json({ 'hostname': hostname });
});

module.exports = router;
