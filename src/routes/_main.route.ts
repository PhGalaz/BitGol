import { Router } from 'express';

import dataRoute from './data.route';
import indexRoute from './index.route';

const mainRoute = Router();
mainRoute.use('/data', dataRoute);
mainRoute.use('/index', indexRoute);

export default mainRoute;