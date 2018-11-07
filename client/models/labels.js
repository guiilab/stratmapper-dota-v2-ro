const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LabelSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    event_ids: {
        type: Array,
        required: false
    },
    units: {
        type: Array,
        required: false
    },
    events: {
        type: Array,
        required: false
    }
}, { strict: false });

module.exports = mongoose.model('Label', LabelSchema);