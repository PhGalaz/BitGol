require('./sockets');

const { Router } = require('express');
const router = Router();
// const faker = require('faker');
const api = require('../apis/apis.js');


const Bet = require('../models/bet');
const League = require('../models/league');
const Country = require('../models/country');
const Fixture = require('../models/fixture');
const Live = require('../models/live');
const Bchprice = require('../models/bchprice');


// var events = require('events');
// var emitter = new events.EventEmitter();

// //Create a sample bet for testing purposes
// router.get('/newbet', async (req, res) => {
//   const fixture = await Fixture.findOne({fixture_id: 328344});
//   await Bet.create({
//     bet_id: faker.random.number(),
//     init_tx: faker.random.word(),
//     init_amount: 20000,
//     taken_amount: 15000,
//     fixture_id: 328344,
//     fixture: fixture,
//     type: 'evslv',
//     factor: 3,
//     status: 'open'
//   });
//   res.json('new bet created!');
// });
//
// //Get all leagues
// router.get('/leagues', async (req, res) => {
//   const leagues = await League.find();
//   res.json({ leagues });
// });
//
// //Get live games
// router.get('/live', async (req, res) => {
//   const livegames = await Live.find();
//   res.json({ livegames });
// });
//
// //Get open bets
// router.get('/bets', async (req, res) => {
//   const bets = await Bet.find();
//   res.json({ bets });
// });


// ***routes*** //
//Serve countries
router.get('/countries', async (req, res) => {
  const countries = await Country.find();
  res.json({ countries });
});

//Serve leagues
router.get('/leagues', async (req, res) => {
  const leagues = await League.find();
  res.json({ leagues });
});

//Serve bchinfo
router.get('/bch', async (req, res) => {
  const info = await Bchprice.find();
  res.json({ info });
});




async function getLives () {
  const delit = await Live.deleteMany();
  const livegames = await api.api_football('https://api-football-v1.p.rapidapi.com/v2/fixtures/live');
  for (let livegame of livegames.fixtures) {
    await Live.create({
      fixture_id: livegame.fixture_id,
      league_id: livegame.league_id,
      league: livegame.league,
      event_date: livegame.event_date,
      event_timestamp: livegame.event_timestamp,
      firstHalfStart: livegame.firstHalfStart,
      secondHalfStart: livegame.secondHalfStart,
      round: livegame.round,
      status: livegame.status,
      statusShort: livegame.statusShort,
      elapsed: livegame.elapsed,
      venue: livegame.venue,
      referee: livegame.referee,
      homeTeam: livegame.homeTeam,
      awayTeam: livegame.awayTeam,
      goalsHomeTeam: livegame.goalsHomeTeam,
      goalsAwayTeam: livegame.goalsAwayTeam,
      score: livegame.score
    })
  }
  console.log('Countries updated on DB ✓')
}

//Get current leagues from api once a week
async function UpdateLeagues () {
  var data = await api.api_football('https://api-football-v1.p.rapidapi.com/v2/fixtures/live');
  data = data.data.response
  for(x in data){
    for(y in data[x].seasons){
      if(data[x].seasons[y].current == true){
        // console.log(data[x].league.type, data[x].league.id, data[x].league.name, data[x].country.name)
        await League.updateOne({league_id:data[x].league.id},{
          league_id: data[x].league.id,
          name: data[x].league.name,
          type: data[x].league.type,
          logo: data[x].league.logo,
          country: data[x].country,
          seasons: data[x].seasons
        },{upsert: true})
        .catch((error) => {
          if(error.code == 11000){
            return
          }
        })
      }
    }
  }
}

//Get countries from api once a week
async function UpdateCountries () {
  var data = await api.api_football('https://api-football-v1.p.rapidapi.com/v3/countries');
  data = data.data.response
  for (let country of data) {
    await Country.create({
      name: country.name,
      code: country.code,
      flag: country.flag
    }).catch((error) => {
      if(error.code == 11000){
        return
      }
    })
  }
}
var interval = setInterval(function() { UpdateCountries(); }, 604800000);



// var interval = setInterval(function() { UpdateLeagues(); }, 604800000);
// getLives();
// var interval = setInterval(function() { getLives(); }, 1200000);


module.exports = router;
