const api = require('../apis/apis.js');

const Bchprice = require('../models/bchprice');
const Live = require('../models/live');

// WebSockets
const { uuid } = require('uuidv4');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const real = require('../routes/index.js');

const clients = new Map();

wss.on('connection', (ws) => {
  const id = uuidv4();
  const color = Math.floor(Math.random() * 360);
  const metadata = { id, color };

  clients.set(ws, metadata);
  console.log(metadata);

  ws.on('message', (messageAsString) => {
    const message = JSON.parse(messageAsString);
    const metadata = clients.get(ws);

    message.sender = metadata.id;
    message.color = metadata.color;

    const outbound = JSON.stringify(message);

    [...clients.keys()].forEach((client) => {
      client.send(outbound);
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
})

// getBchInfo()
var interval = setInterval(async function() { await getBchInfo(); }, 3600000);

//Function to generate a unique ID
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

//Ask api for bch info
async function getBchInfo() {
  const bchInfo = await api.api_cmc('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1831');
  var data = bchInfo.data.data["1831"].quote.USD;
  saveBchInfo(data)
  var packet = [
    {
      event: 'bchinfo',
      data: data
    }
  ]
  var packet = JSON.stringify(packet)
  wss.clients.forEach(function each(client) {
      client.send(packet)
    });
}


//Save bch info to db
async function saveBchInfo(data) {
  console.log(data.price)
  const delit = await Bchprice.deleteMany();
  await Bchprice.create({
    price: data.price,
    volume_24h: data.volume_24h,
    percent_change_1h: data.percent_change_1h,
    percent_change_24h: data.percent_change_24h,
    percent_change_7d: data.percent_change_7d,
    percent_change_30d: data.percent_change_30d,
    percent_change_60d: data.percent_change_60d,
    percent_change_90d: data.percent_change_90d,
    market_cap: data.market_cap,
    market_cap_dominance: data.market_cap_dominance,
    fully_diluted_market_cap: data.fully_diluted_market_cap,
    last_updated: data.last_updated
  })
}

// Lives //
//Get live games from api every minute (1400/day)
async function getLives () {
  const delit = await Live.deleteMany();
  const lives = await api.api_football('https://api-football-v1.p.rapidapi.com/v2/fixtures/live');
  var livegames = lives.data.api.fixtures
  console.log('livegames',livegames)
  emitLives(livegames)
  for (let livegame of livegames) {
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
  console.log('Lives updated on DB ✓')
}


//Emit update live games info event
async function emitLives(lives) {
  var packet = [
    {
      event: 'lives',
      data: lives
    }
  ]
  var packet = JSON.stringify(packet)
  var test = JSON.parse(packet)
  console.log('test', test)
  // wss.clients.forEach(function each(client) {
  //     client.send(packet)
  //   });
}

getLives();
// var interval = setInterval(function() { getLives(); }, 60000);
// var interval = setInterval(function() { getLives(); }, 3600000);
