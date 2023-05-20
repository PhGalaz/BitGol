import express, { Response, Request } from 'express';
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
import { runCron } from './cron'
require('./config/ws.config');
require('dotenv').config({ path: './.env'});

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
          'For accessing the API a valid JWT token must be passed in all the queries in the Authorization header.' +
          'The following syntax must be used in the Authorization header :' +
          'Bearer xxxxxx.yyyyyyy.zzzzzz'
      }
    }
  },
  apis: ['src/routes/*.ts']
});

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

// middleware
app.set('trust proxy', true);
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  '/api/v2/public',
  express.static(path.join(__dirname, '/public'))
);

// swagger
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

// init(httpServer)
// initEvent()
// const eventEmitter = getEvent();
// eventEmitter.emit('event');
export { httpServer };
