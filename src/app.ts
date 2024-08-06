import express, { Response, Request } from 'express';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { createServer } from 'http';
import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';
import mainRoute from './routes/_main.route';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// import { init } from './config/socket.config'
// import { initEvent } from './config/events.config'
import { connect } from 'mongoose';
import { runCron } from './cron';
import session from 'express-session';
import { createClient } from 'redis';
import RedisStore from "connect-redis"

// require('./config/ws.config');
import { wss } from './config/ws.config';
// import { connectMinimalSLP } from './config/minimalSLPwallet';
// require('dotenv').config({ path: './.env'});
// import bchWalletConfig from './config/minimalSLPwallet.config';
// import bchjs from './config/psfBch.config';
// import main from './config/electrumCashNetwork.config';
import { initializeAddressEmitter } from './config/psfBch.config';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

// Initialize redis client.
const redisClient = createClient()
redisClient.connect().catch(console.error)

// Initialize redis store.
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})

// // Minimal SLP Wallet
// async function initializeMinimalWallet() {
//   try {
//     await bchWalletConfig.initializeWallet();
//     // Or initialize with a specific mnemonic
//     // const wallet = await bchWalletConfig.initializeWallet('your mnemonic here');
//     console.log('Wallet initialized');
//   } catch (error) {
//     console.error('Error initializing wallet', error);
//   }
// }
// initializeMinimalWallet();

// // PSF BCH Wallet
// async function initializePsfBchWallet() {
//   try {
//     const seedBuffer = await bchjs.Mnemonic.toSeed(process.env.MNEMONIC!);
//     console.log('seedBuffer:', seedBuffer);
//   } catch (error) {
//     console.error('Error initializing PSF BCH Wallet', error);
//   }
// }
// initializePsfBchWallet();

// // Electrum Cash Network
// main();

// // BCH Wallet
initializeAddressEmitter();










//DB connections
async function connectDB() {
  try {
    console.log('Connecting to MongoDB...');
    const db = await connect(process.env.DB_URI!);
    console.log('MongoDB Connected...', db.connection.db.databaseName);
    runCron();
  } catch (err) {
    console.error(err);
    connectDB();
  }
}
connectDB();

const app = express();

// middlewares
app.set('trust proxy', true); // trust first proxy
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(
  '/api/v2/public',
  express.static(path.join(__dirname, '/public'))
);
app.use(session({
  store: redisStore,
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Always TRUE in production !!! 
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * .15 // 4 hours
  }
}))

// swagger
const swaggerDocs = swaggerJsDoc({
  swaggerDefinition: {
    info: {
      title: 'BitGol API',
      description: 'BitGol API Information',
      version: '1.0',
      contact: {
        name: 'Felipe Galaz',
        email: 'felipe@galaz.de',
        url: 'www.galaz.de'
      },
      servers: [
        {
          url: process.env.PORT,
          name: 'test'
        }
      ]
    },
    basePath: '/api/v2',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        scheme: 'Bearer',
        description:
          'Some description'
      }
    }
  },
  apis: ['src/routes/*.ts']
});
app.get('/swagger.json', function (_req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});
app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
  );
  
app.use('/api/v2', mainRoute);

app.all('*', (_req: Request, _res: Response) => {
  throw new NotFoundError();
});
app.use(errorHandler);

const httpServer = createServer(app);

// Upgrade HTTP server to handle WebSocket connections
httpServer.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// init(httpServer)
// initEvent()
// const eventEmitter = getEvent();
// eventEmitter.emit('event');
export { httpServer };
  