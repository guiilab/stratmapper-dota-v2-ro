let matches;
let entries;
let sessions;
let heatmaps;
let labels;

//fetch matches
fetch('./matches.json')
    .then(function (result) {
        result.json().then(function (data) {
            matches = data;
            console.log(matches)
        })
    })

fetch('./entries.json')
    .then(function (result) {
        result.json().then(function (data) {
            entries = data;
            console.log(entries)
        })
    })
