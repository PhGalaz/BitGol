const { Schema, model } = require('mongoose');

const countrySchema = new Schema({
  name: { type: String, unique: true},
  code: String,
  flag: String
})

module.exports = model('country', countrySchema)
