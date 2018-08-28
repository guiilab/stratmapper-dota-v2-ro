const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const wwwhisper = require("connect-wwwhisper");

const app = express();
const port = process.env.PORT || 5000;
const EventModel = require('./client/models/events.js');
const MatchModel = require('./client/models/matches.js')

app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true
}));
app.use(bodyParser.json({
    limit: '500mb'
}));

const mongoUrl = 'mongodb://admin:M4pTh3W0rld@ds123532.mlab.com:23532/stratmap';

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

// API calls
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/events', function (req, res) {
    return EventModel
        .find({
            unit: req.body.unit,
            event_type: req.body.event_type
        })
        .exec(function (err, events) {
            return res.send(events)
        })
})

app.post('/api/matches', function (req, res) {
    return MatchModel
        .find({
            match_id: 4321
        })
        .exec(function (err, events) {
            return res.send(events)
        })
})

if (process.env.NODE_ENV === 'production') {

    // app.use(wwwhisper())

    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });

}
app.listen(port, () => console.log(`Listening on port ${port}`));