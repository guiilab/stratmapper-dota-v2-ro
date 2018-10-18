const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http')

const app = express();
const port = process.env.PORT || 5000;
// const EventModel = require('./client/models/events.js');
const createEventModel = require('./client/models/dynamicEvents.js');
const MatchModel = require('./client/models/matches.js');
const LabelModel = require('./client/models/labels.js');

var suffix;
var EventModel;

app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true
}));
app.use(bodyParser.json({
    limit: '500mb'
}));

// const mongoUrl = 'mongodb://admin:M4pTh3W0rld@ds253922.mlab.com:53922/stratmap_overmatch'
const mongoUrl = 'mongodb://admin:M4pTh3W0rld@ds121373.mlab.com:21373/stratmap_dota_dev'

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('error', function callback() {
    console.log('\nEnsure that you are running a database. \nYou may need to start one with "$ sudo mongod" \nPlease see our README.md for more info. ')
});

db.once('open', function callback() {
    console.log('Initialized Connection with MongoDB.\n');
});

app.get('/api/matchentries', function (req, res) {
    return MatchModel
        .find({})
        .exec(function (err, entries) {
            return res.send(entries)
        })
})

app.post('/api/matches', function (req, res) {
    return MatchModel
        .find({
            file_name: req.body.matchId
        })
        .exec(function (err, match) {
            return res.send(match)
        })
})

app.post('/api/events', function (req, res) {
    if (EventModel) {
        delete db.models.Event;
    }
    suffix = req.body.matchId;
    EventModel = createEventModel(suffix)
    return EventModel
        .find({
            unit: req.body.unit,
            event_type: req.body.event_type,
            timestamp: { $gte: req.body.timestampRange.start, $lte: req.body.timestampRange.end }
        })
        .exec(function (err, events) {
            return res.send(events)
        })
})

app.post('/api/labels', function (req, res) {
    console.log(req.body.author)
    return LabelModel
        .find({
            author: req.body.author
        })
        .exec(function (err, label) {
            console.log(label)
            return res.send(label)
        })
})

setInterval(function () {
    http.get("https://polar-forest-80084.herokuapp.com/");
}, 1740000);

if (process.env.NODE_ENV === 'production') {

    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });

}
app.listen(port, () => console.log(`Listening on port ${port}`));