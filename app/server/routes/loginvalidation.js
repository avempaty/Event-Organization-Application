
const express = require('express');
const request = require('request');

const User = require('../models/user');

let router = express.Router();

router.route('/login')
    .post((req, res) => {
        User.find({$and: [
                    {username: req.body.username},
                    {password: req.body.password}
                ]}, (err, user) => {
            if (err) {
                res.send(err);
            }
            if (user != null && user.length != 0) {
                res.jsonp({authenticated: true});
            }
            else {
                res.jsonp({authenticated: false});
            }
        });
    });

router.route('/register')
    .post((req, res) => {
        const user = new User();
        if (user.username !== null &&
            user.password !== null &&
            user.firstName !== null &&
            user.lastName !== null) {
                user.username = req.body.username;
                user.password = req.body.password;
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;

                user.save(err => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.jsonp({ message: 'User created!' });
                    }
                })
        }
        else {
            res.jsonp({ message: 'Incorrect parameters.'});
        }
    });

module.exports = router;