const { Schema, model } = require('mongoose');

const betSchema = new Schema({
  bet_id: Number,
  created: Date,
  init_user: Number,
  init_tx: String,
  init_amount: Number,
  taken_amount: Number,
  fixture_id: Number,
  fixture: Array,
  type: String,
  factor: Number,
  status: String,
  users: Array
})

module.exports = model('bet', betSchema)
