const { Schema, model } = require('mongoose');

const leagueSchema = new Schema({
  league_id: { type: Number, unique: true},
  name: String,
  type: String,
  logo: String,
  country: {},
  seasons: []
})

module.exports = model('league', leagueSchema)
