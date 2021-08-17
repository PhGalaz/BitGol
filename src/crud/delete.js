require('../database')

const League = require('../models/League')
const Bet = require('../models/Bet')
const Fixture = require('../models/Fixture')

const deleteFunction = async () => {
  const result = await Fixture.deleteMany()
  //const result = await Bet.deleteMany()
  //const result = await League.deleteOne({season: '2019'})
  //const result = await League.findOneAndDelete({season: '2019'})
  //const result = await League.findByIdAndDelete({'46547382yegdsy7238'})
  console.log(result)
}

deleteFunction();
