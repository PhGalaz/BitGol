import { Router } from 'express';

import dataRoute from './data.route';
import indexRoute from './index.route';
import usersRoute from './users.route';
import betsRoute from './bets.route';

const mainRoute = Router();
mainRoute.use('/data', dataRoute);
mainRoute.use('/index', indexRoute);
mainRoute.use('/users', usersRoute);
mainRoute.use('/bets', betsRoute);

export default mainRoute;