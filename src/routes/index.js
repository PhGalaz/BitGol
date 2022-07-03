// const faker = require('faker');

require('./sockets');

const { Router } = require('express');
const router = Router();
const api = require('../apis/apis.js');


const Bet = require('../models/bet');
const League = require('../models/league');
const Country = require('../models/country');
const Fixture = require('../models/fixture');
const Team = require('../models/team');
const Live = require('../models/live');
const Bchprice = require('../models/bchprice');


// var events = require('events');
// var emitter = new events.EventEmitter();



//Create a sample bet for testing purposes
router.get('/newbet', async (req, res) => {
  const fixture = await Fixture.findOne({fixture_id: 293657});
  console.log(fixture)
  await Bet.create({
    bet_id: 88891,
    created: Date.now(),
    init_tx: 'f61910c68ed347d60374718fe679a5ajshvjdvsgjsa6c407adc1a36257cd10',
    init_amount: 900000,
    taken_amount: 806000,
    fixture_id: 293657,
    type: 011,
    home_factor: 0.00,
    draw_factor: 1.00,
    away_factor: 5.00,
    status: 'open'
  });
  res.json('new bet created!');
});









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

//Serve teams
router.get('/teams', async (req, res) => {
  const teams = await Team.find();
  res.json({ teams });
});

//Serve live games
router.get('/lives', async (req, res) => {
  const livegames = await Live.find();
  res.json({ livegames });
});

//Serve open bets
router.get('/bets', async (req, res) => {
  const bets = await Bet.find();
  res.json({ bets });
});

//Serve specific fixture by id
router.get('/fixture/:id', async (req, res) => {
  let fixture = await Fixture.findOne({ fixture_id: req.params.id }).lean()
  // let bets = await Bet.find({ fixture_id: req.params.id })
  // fixture.bets = bets
  res.json({ fixture })
}); 

//Serve fixtures
router.get('/fixtures', async (req, res) => {
  // const fixtures = await Fixture.find();
  const fixtures = await Fixture.find({
      event_date: {
          $gte: "2022-03-24T00:00:00.000Z",
          $lt: "2022-03-25T00:00:00.000Z"
      }
  })
  res.json({ fixtures });
});











//Get current leagues from api once a week
async function UpdateLeagues () {
  var leagues = await api.api_football('https://api-football-v1.p.rapidapi.com/v3/leagues');
  leagues = leagues.data.response
  for(x in leagues){
    // for(y in leagues[x].seasons){
      // if(leagues[x].seasons[y].current == true){
        // console.log(data[x].league.type, data[x].league.id, data[x].league.name, data[x].country.name)
        await League.updateOne({league_id:leagues[x].league.id},{
          league_id: leagues[x].league.id,
          name: leagues[x].league.name,
          type: leagues[x].league.type,
          logo: leagues[x].league.logo,
          country: leagues[x].country,
          seasons: leagues[x].seasons
        },{upsert: true})
        .catch((error) => {
          if(error.code == 11000){
            return
          }
        })
      // }
    // }
    // console.log(leagues[x].league.name)
  }
  console.log('Done updating leagues')
}
// UpdateLeagues ()




async function test (){
  // const leagues = await League.find();
  const countries = await Country.find();


  for(var y in countries){
    if(countries[y].name.charAt(0) == 'A'){
      var params = {
        country: countries[y].name
      }
      var teams = await api.api_football('https://api-football-v1.p.rapidapi.com/v3/teams', params);
      for(var x in teams.data.response){
        await Team.updateOne({id:teams.data.response[x].team.id},{
          id: teams.data.response[x].team.id,
          name: teams.data.response[x].team.name,
          country: teams.data.response[x].team.country,
          national: teams.data.response[x].team.national,
          logo: teams.data.response[x].team.logo
        },{upsert: true})
        .catch((error) => {
          if(error.code == 11000){
            return
          }
        })
      }
    }
    // console.log('ok')
  }

  // for(var x in countries){
    // var country_leagues = []
    // var country_cups = []
    // for(var y in leagues){
    //   if(leagues[y].country.name == countries[x].name){
    //     if(leagues[y].type == 'League'){
    //       country_leagues.push(leagues[y].league_id)
    //     } else if (leagues[y].type == 'Cup') {
    //       country_cups.push(leagues[y].league_id)
    //     }
    //   }
    // }
    // await Country.updateOne({name:countries[x].name},{
    //   leagues: country_leagues,
    //   cups: country_cups
    // })
  // }
  // console.log('fin')
}
// test()





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







//Get X fixtures
async function NextFixtures () {
  var params = {
    // league: '479',
    // season: '2022'
    // current: true
     date: '2022-03-17'
    // next: '99'
    // fixture: '830316'
  }
  var data = await api.api_football('https://api-football-v1.p.rapidapi.com/v3/fixtures', params);
  data = data.data.response
  console.log(data)
  // await League.updateOne({league_id:29},{
  //   fixtures: data
  // })
  // for (let fixture of data) {
  //   await Fixture.updateOne({fixture_id: fixture.fixture.id},{
  //     fixture_id: fixture.fixture.id,
  //     league_id: 129,
  //     league: fixture.league,
  //     event_date: fixture.fixture.date,
  //     event_timestamp: fixture.fixture.timestamp,
  //     round: fixture.league.round,
  //     status: fixture.fixture.status,
  //     venue: fixture.fixture.venue,
  //     homeTeam: fixture.teams.home,
  //     awayTeam: fixture.teams.away,
  //     score: fixture.score
  //   },{upsert: true})
  //   .catch((error) => {
  //     if(error.code == 11000){
  //       console.log(error)
  //     }
  //   })
  // }
  // console.log('fin')
}
// NextFixtures()



async function GetFixtures () {
  let now = new Date().getTime()
  for (var i = 0; i < 10; i++) {
    var date = now + (86400000 * i)
    date = new Date(date)
    date = date.toISOString().split('T')[0]
    var params = {
      date: date
    }
    var data = await api.api_football('https://api-football-v1.p.rapidapi.com/v3/fixtures', params);
    data = data.data.response
    for (let fixture of data) {
      await Fixture.updateOne({fixture_id: fixture.fixture.id},{
        fixture_id: fixture.fixture.id,
        league_id: fixture.league.id,
        league: fixture.league,
        event_date: fixture.fixture.date,
        event_timestamp: fixture.fixture.timestamp,
        round: fixture.league.round,
        status: fixture.fixture.status,
        venue: fixture.fixture.venue,
        homeTeam: fixture.teams.home,
        awayTeam: fixture.teams.away,
        score: fixture.score
      },{upsert: true})
      .catch((error) => {
        if(error.code == 11000){
          console.log(error)
        }
      })
    }
  }
}
// GetFixtures()



router.get('/test', async (req, res) => {
  var params = {
    // league: '88',
    // season: '2021'
    // current: true
     date: '2022-03-01'
       // from: '2022-03-01',
       // to: '2022-03-02'
  }
  var data = await api.api_football('https://api-football-v1.p.rapidapi.com/v3/fixtures', params);
  data = data.data.response

  // await League.updateOne({league_id:88},{
  //   fixtures: data
  // })
  // for (let fixture of data) {
  //   await Fixture.updateOne({fixture_id: fixture.fixture.id},{
  //     fixture_id: fixture.fixture.id,
  //     league_id: 88,
  //     league: fixture.league,
  //     event_date: fixture.fixture.date,
  //     event_timestamp: fixture.fixture.timestamp,
  //     round: fixture.league.round,
  //     status: fixture.fixture.status,
  //     venue: fixture.fixture.venue,
  //     homeTeam: fixture.teams.home,
  //     awayTeam: fixture.teams.away,
  //     score: fixture.score
  //   },{upsert: true})
  //   .catch((error) => {
  //     if(error.code == 11000){
  //       console.log(error)
  //     }
  //   })
  // }
  // console.log('fin')
  // res.json(yourDate.toISOString().split('T')[0])
  // res.json(yourDate)
});



//Get teams from api once a week
async function UpdateTeams () {
  var params = {
    league: '265',
    season: '2022'
  }
  var data = await api.api_football('https://api-football-v1.p.rapidapi.com/v3/teams', params);
  //console.log(data.data.response)
}
// UpdateTeams()



//Testing only
async function Testing () {
  var params = {
    id: '3113'
  }
  var data = await api.api_football('https://api-football-v1.p.rapidapi.com/v3/leagues', params);
  //console.log(data.data)
}
// Testing()



// var interval = setInterval(function() { UpdateLeagues(); }, 604800000);



module.exports = router;
