require('../connection')

const League = require('../models/League')

async function getLeague() {
  const league = await League.findOne({country: 'Argentina'});
  console.log(league)
}

getLeague();
