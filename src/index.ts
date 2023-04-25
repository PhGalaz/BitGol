import { httpServer } from './app'
require('dotenv').config({ path: './.env'});

const start = async () => {
  // if(!process.env.JWT_KEY) {
  //     throw new Error('jwt must be defined')
  // }
  const PORT = process.env.PORT;

  if (!PORT) {
    throw new Error('Port must be defined')
  }

  try {
    httpServer.listen(PORT, () => {
      console.log(`listen on port: ${PORT} backend BitGol`)
      console.log(`Swagger route: http://localhost:${PORT}/swagger`)
    })
  } catch (error) {
    console.error(error)
  }
}

start()