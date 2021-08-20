const { Schema, model } = require('mongoose');

const leagueSchema = new Schema({
  league_id: { type: Number, unique: true},
  name: String,
  type: String,
  logo: String,
  country: {
    name: String,
    code: String,
    flag: String
  },
  seasons: []
})

module.exports = model('league', leagueSchema)
