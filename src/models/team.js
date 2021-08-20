const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
  id: { type: Number, unique: true},
  name: String,
  country: String,
  national: Boolean,
  logo: String,
})

module.exports = model('team', teamSchema)
