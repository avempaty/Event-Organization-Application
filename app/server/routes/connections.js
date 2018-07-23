const User = require('../models/user');
const express = require('express');
let router = express.Router();

const connectionProjection = 'username firstName lastName connections'

router.route('/getconnections')
    .put((req, res) => {
        User.findOne({username: req.body.username}, connectionProjection, (err, user) => {
            if (err) {
                res.send(err);
            }
            else {
                res.jsonp(user);
            }
        })
    });

router.route('/:username')
    .put((req, res) => {
        if (req.body.username === null) {
            res.jsonp({message: 'Incorrect username.'});
        }
        else if (req.params.username === req.body.username) {
            res.jsonp({message: 'Cannot add yourself!'});
        }
        else {
            // Globals
            userConnectTest = false;
            strangerConnectTest = false;
            
            User.findOne({username: req.params.username}, connectionProjection, (err, user) => {

                // Check if user is connected to stranger
                for (var i = 0; i < user.connections.length; i++) {
                    if (user.connections[i].username === req.body.connectingUser) {
                        userConnectTest = true;                  
                    }
                }          
                if (err) {
                    res.send(err);
                }
                else if (user === null) {
                    res.jsonp({message: 'You do not exist.'});
                }
                else {
                    User.findOne({username: req.body.connectingUser}, connectionProjection, (err, stranger) => {
                        if (err) {
                            res.send(err);
                        }
                        else if (stranger === null) {
                            res.jsonp({message: 'Stranger does not exist.'});
                        }
                        else {
                            // Pre-define connection details
                            var userFullName = user.firstName + " " + user.lastName;
                            var userConnection = {username: user.username, fullname: userFullName};

                            var strangerFullName = stranger.firstName + " " + stranger.lastName;
                            var strangerConnection = {username: stranger.username, fullname: strangerFullName};

                            // Check if stranger is connected with user
                            for (var i = 0; i < stranger.connections.length; i++) {
                                if (stranger.connections[i].username === user.username) {
                                    strangerConnectTest = true;
                                    break;
                                }
                            }
                            if (strangerConnectTest && userConnectTest) {
                                res.jsonp({message: 'Already connected!'});
                            }
                            else {
                                user.connections.push(strangerConnection);
                                user.save(err => {
                                    if (err) {
                                        res.send(err);
                                    }
                                });

                                stranger.connections.push(userConnection);
                                stranger.save(err => {
                                    if (err) {
                                        res.send(err);
                                    }
                                });
                                res.jsonp({message: 'User connected!'});
                            }
                        }
                    });
                }
            });
        }
    });

module.exports = router;    