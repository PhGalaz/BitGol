const { Schema, model } = require('mongoose');

const fixtureSchema = new Schema({
    fixture_id: Number,
    league_id: Number,
    league: [],
    event_date: Date,
    event_timestamp: Number,
    firstHalfStart: Number,
    secondHalfStart: Number,
    round: String,
    status: [],
    statusShort: String,
    elapsed: Number,
    venue: [],
    referee: String,
    homeTeam: [],
    awayTeam: [],
    goalsHomeTeam: Number,
    goalsAwayTeam: Number,
    score: []
})

module.exports = model('fixture', fixtureSchema)
