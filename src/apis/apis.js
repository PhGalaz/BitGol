const axios = require('axios');


async function api_football(url, params){
  const resp = await axios.get(url, {
    headers: {
      "x-rapidapi-key": "43dea35be8msh72fd9cb56f52a00p1a8f28jsn9827228c9bce",
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
      'X-CMC_PRO_API_KEY': '9a2a188d-503c-482d-8c2f-e3190f3e3e1a'
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
