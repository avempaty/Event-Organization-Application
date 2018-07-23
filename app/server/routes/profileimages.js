const express = require('express');
const request = require('request');
const fs = require('fs');

const Image = require('../models/image');
const User = require('../models/user');

let router = express.Router();

router.route('/setprofileimage').put((req, res) => {
    const image = new Image();

    image.username = req.body.username;
    image.img.data = req.body.data;
    image.img.contentType = 'image/jpg';

    console.log(req.body.data);
    console.log(image.img.data);
    
    console.log(image.img.data.toString('base64'));

    Image.findOneAndRemove({username: req.body.username}, (err, user) => {
        if (err) res.send(err);
    });

    image.save(err => {
        if (err) {
            res.send(err);
        }
        else {
            res.jsonp({message: 'Saved successfully.'});
        }
    });
});

router.route('/getprofileimage/:username').get((req, res) => {
    Image.findOne({username: req.params.username}, (err, image) => {
        if (err) {
            res.send(err);
        }
        else {
            if (image === null) {
                res.jsonp({message: 'No image.'});
            }
            else {
                res.jsonp(image.img.data.toString());
            }
        }
    })
});

module.exports = router;