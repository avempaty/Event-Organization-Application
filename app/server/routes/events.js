const AppEvent = require('../models/appevent');
const User = require('../models/user');

const mongoose = require('mongoose');
const express = require('express');

let router = express.Router();

router.route('/')
    .get((req, res) => {
        AppEvent.find(req.query, (err, appEvents) => {
            if (err) {
                res.send(err);
            } else {
                res.jsonp(appEvents);
            }
        });
    })
    .post((req, res) => {
        let appEvent = new AppEvent();
        
        appEvent.creator = req.body.creator;
        appEvent.title = req.body.title;
        appEvent.date =  req.body.date;
        appEvent.location = req.body.location;
        appEvent.information = req.body.information;

        appEvent.save((err, ae) => {
            if (err) {
                res.send(err);
            } else {
                User.update(
                    { username: req.body.creator },
                    { $push: { events: { eventid: ae._id, eventname: req.body.title }}},
                    (uerr) => {
                        if (uerr) {
                            res.send(uerr);
                        } else {
                            res.jsonp({ data: ae, success: true, message: `App Event "${appEvent.title}" created!`});
                        }
                    }
                ) 
            }
        })
    });

router.route('/:id')
    .get((req, res) => {
        AppEvent.findOne({ _id: req.params.id }, (err, appEvent) => {
            if (err) {
                res.send(err);
            } else {
                if (appEvent === null) {
                    res.jsonp({ _id: null, message: 'Event does not exist.' });
                } else {
                    res.jsonp(appEvent);
                }
            }
        })
    })
    .delete((req, res) => {
        AppEvent.findOneAndRemove(
            { _id: req.params.id },
            (err, ae) => {
                if (err) {
                    res.send(err);
                } else {
                    let removeFromEvents = (username) => {
                        return User.update(
                            { username: username },
                            { $pull: { events: { eventid: ae._id }}}
                        );   
                    }

                    removeFromEvents(ae.creator)
                    .then(
                        Promise.all(
                            ae.participants.map((user) => removeFromEvents(user))
                        )
                        .then((data) => {
                                console.log(data);
                                res.jsonp({ success: true, message: 'Deleted event!'});
                        })
                        .catch((uerr) => {
                            console.error(uerr);
                            res.send(uerr);
                        })
                    )
                    ;
                }
            } 
        );
    })
    .put((req, res) => {
        AppEvent.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            (err, ae) => {
                if (err) {
                    res.jsonp(err);
                } else {
                    res.jsonp({ data:ae, success: true, message: 'Updated event!'});
                }
            }
        );
    });

router.route('/:id/moderators')
    .post((req, res) => {
        AppEvent.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: {
                moderators: req.body.username,
                attendees: req.body.username,
                participants: req.body.username
            }},
            (err, ae) => {
                console.log(ae);
            if (err) {
                res.jsonp(err);
            } else {
                if (ae.attendees.find((user) => user === req.body.username)) {
                    res.jsonp({ success: true, message: `Moderator added "${req.body.username}!"`});
                    return;
                }
                User.update(
                    { username: req.body.username },
                    { $addToSet: { events: { eventid: req.params.id, eventname: ae.title }}},
                    (uerr) => {
                        if (uerr) {
                            res.jsonp(uerr);
                        } else {
                            res.jsonp({ success: true, message: `Moderator added "${req.body.username}!"`});
                        }
                    }
                )
            }
        });
    })

router.route('/:id/moderators/:username')
    .delete((req, res) => {
        AppEvent.update(
            { _id: req.params.id },
            { $pull: { moderators: req.params.username }},
        (err) => {
            if (err) {
                res.jsonp(err);
            } else {
                res.jsonp({ success: true, message: `Moderator removed ${req.params.username}!`});
            }
        });
    });

router.route('/:id/attendees')
    .post((req, res) => {
        AppEvent.update(
            { _id: req.params.id },
            { $push: { attendees: req.body.username }},
        (err) => {
            if (err) {
                res.jsonp(err);
            } else {
                res.jsonp({ success: true, message: `Attendee added "${req.body.username}!"`});
            }
        });
    })

router.route('/:id/attendees/:username')
    .delete((req, res) => {
        AppEvent.update(
            { _id: req.params.id },
            { $pull: { attendees: req.params.username }},
        (err) => {
            if (err) {
                res.jsonp(err);
            } else {
                res.jsonp({ success: true, message: `Attendee removed ${req.body.username}!`});
            }
        });
    });

router.route('/:id/participants')
    .post((req, res) => {
        AppEvent.update(
            { _id: req.params.id },
            { $push: { participants: req.body.username }},
        (err) => {
            if (err) {
                res.send(err);
            } else {
                res.jsonp({ success: true, message: `Participant added "${req.body.username}!"`});
            }
        });
    })

router.route('/:id/participants/:username')
    .delete((req, res) => {
        AppEvent.update(
            { _id: req.params.id },
            { $pull: { participants: req.params.username }},
        (err) => {
            if (err) {
                res.send(err);
            } else {
                res.jsonp({ success: true, message: `Participant removed ${req.params.username}!`});
            }
        });
    });

    module.exports = router;