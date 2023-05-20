import { Router } from 'express';

import dataRoute from './data.route';
import indexRoute from './index.route';
import usersRoute from './users.route';

const mainRoute = Router();
mainRoute.use('/data', dataRoute);
mainRoute.use('/index', indexRoute);
mainRoute.use('/users', usersRoute);

export default mainRoute;