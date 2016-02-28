'use strict'

var request = require('supertest');
var args = process.argv.splice(2);
var lwip = require('lwip')
var total = args[0] || 30;
var url = args[1] || 'http://localhost:3300';
if(url.indexOf('http://') != 0) {
    url = 'http://' + url;
}
var Buffer = require('buffer').Buffer;
var WIDTH = 60;
var HEIGHT = 60;
// let palette = ['red', 'blue', 'green', '#800080', '#FF8C00', 'gray'];
let palette = ['red', 'blue', 'green', 
    {'r': 128, 'g': 0, 'b': 128, 'a': 100},
    {'r': 255, 'g': 76, 'b': 0, 'a': 100},
     'gray'];
var maps = {};
sendImage(total);

function sendImage(num) {
    var color = getColor();
    if(maps[color]) {
        postImage(maps[color]);
    } else {
        lwip.create(WIDTH, 60, color, function(err, image) {
            image.toBuffer('png', {}, function (err, buffer) {
                var doc = { 'data': 'data:image/png;base64,' + buffer.toString('base64') };
                maps[color] = doc;
                postImage(doc);
            });
    	});
    }

    if(--num > 0) {
        setTimeout(function() {
            sendImage(num)
        }, 50);
    }
}

function postImage(doc) {
    console.log('post to ' + url);
    request(url)
        .post('/image')
        .send(doc)
        .end(function(err, res) {
            if (err) {
                throw err;
            }
        });
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}


function getColor() {
    var i = randomInt(0, palette.length-1);
    return palette[i];
}
