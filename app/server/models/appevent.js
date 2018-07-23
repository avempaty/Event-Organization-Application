const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let appEventSchema= new Schema({
    creator: {type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, default: '' },
    information: { type: String, default: '' },
    moderators: { type: [Schema.Types.String], default: [] },
    attendees: { type: [Schema.Types.String], default: [] },
    participants: { type: [Schema.Types.String], default: [] },
    eventpicture: { type: Buffer, contentType: String }
}, { versionKey: false });

module.exports = mongoose.model('AppEvent', appEventSchema);
