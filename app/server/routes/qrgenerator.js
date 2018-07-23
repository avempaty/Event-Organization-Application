const express = require('express');
const request = require('request');
const fs = require('fs');

const Image = require('../models/image');

let router = express.Router();


router.route('/').get((req, res) => {
    var requestSettings = {
        url: 'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=' + req.query.id,
        method: 'GET',
        encoding: null
    };

    request(requestSettings, function(error, response, body) {
        res.type('png');
        res.send(body);
    })
});

module.exports = router;