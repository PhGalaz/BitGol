require('../connection')

const League = require('../models/League')



async function main(){
  const leagues = await League.find({country:'World'});

  console.log(leagues)
}

main()
