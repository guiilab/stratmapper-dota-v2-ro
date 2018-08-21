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
    }
});

module.exports = mongoose.model('Match', MatchSchema);