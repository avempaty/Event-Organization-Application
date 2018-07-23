const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let imageSchema = new Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    username: String
});

module.exports = mongoose.model('Image', imageSchema);