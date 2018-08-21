const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventSchema = new Schema({
    node_id: {
        type: Number,
        required: true
    },
    linked_node_id: {
        type: Number,
        required: false
    },
    unit: {
        type: String,
        required: true
    },
    linked_unit: {
        type: String,
        required: false
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    event_type: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
}, { strict: false });

module.exports = mongoose.model('Event', EventSchema);