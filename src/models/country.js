const { Schema, model } = require('mongoose');

const countrySchema = new Schema({
  name: { type: String, unique: true},
  code: String,
  flag: String,
  teams: [],
  leagues: [],
  cups: []
})

module.exports = model('country', countrySchema)
