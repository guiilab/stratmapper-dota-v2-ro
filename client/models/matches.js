var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MatchSchema = new Schema({
    matchId: {
        type: Number,
        required: true
    },
    apiMatchId: {
        type: Number,
        required: false
    },
    game: {
        type: String,
        required: true
    },
    coordinates: {
        type: Number,
        required: true
    },
    bottom: {
        type: Number,
        required: true
    },
    left: {
        type: Number,
        required: true
    },
    right: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Matches', MatchSchema);