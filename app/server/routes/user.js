const User = require('../models/user');
const express = require('express');
const file = require('file-system');

let router = express.Router();

const mongoose = require('mongoose');

const allUserProjection = 'username firstName lastName about events facebook snapchat linkedin instagram profilePicture';
const userInfoProjection = 'firstName lastName about events facebook snapchat linkedin instagram profilePicture';


router.route('/allusers')
    .get((req, res) => {
        User.find({}, allUserProjection, (err, users) => {
            if (err) res.send(err);
            res.jsonp(users);
        });
    })
    .post((req, res) => {
        const user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;

        User.findOne({username: req.body.username}, allUserProjection, (err, users) => {})

        user.save(err => {
            if (err) res.send(err);
            else res.jsonp({ message: `User "${user.username}" created!`});
        });
    })
    ;

router.route('/:getuser')
    .get((req, res) => {
        User.findOne({username: req.params.getuser}, userInfoProjection, (err, user) => {
            if (err) {
                res.send(err);
            }
            else if (user === null) {
                res.jsonp({ _id: null, message: 'User does not exist.' });
            }
            else {
                res.jsonp(user);
            }
        });
    });

router.route('/:username')
    .put((req, res) => {
        keys = Object.keys(req.body);
        modelKeys = Object.keys(User.schema.paths);
        if (req.body.username === null) {
            res.jsonp({ message: 'Incorrect username.'});
        }
        else {
            User.findOne({username: req.body.username}, allUserProjection, (err, user) => {
                if (err) {
                    res.send(err);
                }
                else if (user === null) {
                    res.jsonp({message: 'User does not exist.'});
                }
                else {
                    for (key in keys) {
                        for (modelKey in modelKeys) {
                            if (keys[key] === modelKeys[modelKey]) {
                                if (keys[key] === 'profilePicture' ||
                                        keys[key] === 'connections') {
                                    continue;
                                }
                                else if (keys[key] === 'events') {
                                    continue;
                                }
                                else {
                                    if (keys[key] !== '_id' && keys[key] !== 'username' && keys[key] !== 'password') {
                                        property = modelKeys[modelKey];
                                        user[property] = req.body[property];
                                    }
                                }
                            }
                        }
                    }

                    user.save(err => {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.jsonp({ message: 'User updated!' });
                        }
                    })
                }
            });
        }
    });

router.route('/:username/events')
    .post((req, res) => {
        // Globals
        var eventAdded = false;

        User.findOne({username: req.params.username}, (err, user) => {
            if (err) {
                res.send(err);
            }
            else {
                if (user.events === undefined) {
                    User.update(
                        { username: req.params.username },
                        { $push: { events: {eventid: req.body.eventId,
                                                eventname: req.body.eventname} }},
                    (err) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.jsonp({ success: true, message: `Event added!`});
                        }
                    });
                }
                else {
                    for (var i = 0; i < user.events.length; i++) {
                        if (user.events[i].eventid === req.body.eventId) {
                            eventAdded = true;
                        }
                    }
                    if (!eventAdded) {
                        User.update(
                            { username: req.params.username },
                            { $push: { events: {eventid: req.body.eventId,
                                                    eventname: req.body.eventname} }},
                        (err) => {
                            if (err) {
                                res.send(err);
                            } else {
                                res.jsonp({ success: true, message: `Event added!`});
                            }
                        });
                    }
                    else {
                        res.jsonp({message: 'Event already added!'});
                    }
                }
            }
        });
    })

router.route('/:username/events/:eventId')
    .delete((req, res) => {
        User.update(
            { username: req.params.username },
            { $pull: { events: { _id: mongoose.Types.ObjectId(req.params.eventId) }}},
        (err) => {
            if (err) {
                res.send(err);
            } else {
                res.jsonp({ success: true, message: `Event removed!`});
            }
        });
    })
module.exports = router;
