const axios = require('axios');


async function api_football(url, params){
  const resp = await axios.get(url, {
    headers: {
      "x-rapidapi-key": process.env.API_FOO_KEY,
    	"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    	"useQueryString": true
    },
    params: params
  })
  .then((res) => {
    return res
  })
  .catch((error) => {
    console.error(error)
  })
  return resp
}


async function api_cmc(url){
  const resp = await axios.get(url, {
    headers: {
      'X-CMC_PRO_API_KEY': process.env.API_CMC_KEY
    },
    json: true,
    gzip: true
  })
  .then((res) => {
    return res
  })
  .catch((error) => {
    console.error(error)
  })
  return resp
}




module.exports = {
  api_football: api_football,
  api_cmc: api_cmc
}
