const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    about: { type: String, default: 'Hello! This is a description about yourself! Feel free to edit and change.' },
    events: [ { 'eventid': Schema.Types.String,
                    'eventname': Schema.Types.String } ],
    facebook: { type: String, default: 'Facebook' },
    snapchat: { type: String, default: 'Snapchat' },
    linkedin: { type: String, default: 'Linkedin' },
    instagram: { type: String, default: 'Instagram' },
    profilePicture: { type: String, default: '' },
    connections: [ { 'username': Schema.Types.String,
                        'fullname': Schema.Types.String } ]
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);
