const { Schema, model } = require('mongoose');

const bchpriceSchema = new Schema({
    price: Number,
    volume_24h: Number,
    percent_change_1h: Number,
    percent_change_24h: Number,
    percent_change_7d: Number,
    percent_change_30d: Number,
    percent_change_60d: Number,
    percent_change_90d: Number,
    market_cap: Number,
    market_cap_dominance: Number,
    fully_diluted_market_cap: Number,
    last_updated: String
})

module.exports = model('bchprice', bchpriceSchema)
