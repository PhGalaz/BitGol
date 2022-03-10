const { Schema, model } = require('mongoose');

const betSchema = new Schema({
  bet_id: Number,
  created: Date,
  init_user: Number,
  init_user_name: String,
  init_user_pic: String,
  init_tx: String,
  init_amount: Number,
  taken_amount: Number,
  fixture_id: Number,
  fixture: Array,
  type: Number,
  home_factor: Number,
  draw_factor: Number,
  away_factor: Number,
  status: String,
  users: Array
})

module.exports = model('bet', betSchema)
