import { Router } from 'express';
import { validateRequest } from '../middlewares';
import IndexController from '../controllers/index.controller';

const controller = new IndexController();
const indexRoute = Router();

/**
 * @swagger
 * /index/bch:
 *   get:
 *     description:
 *       "Get bch index"
 *     summary: "get bch index"
 *     tags:
 *       - Index
 *     responses:
 *       200:
 *         examples:
 *           application/json: {
 *             "id": 1,
 *             "name": "Afghanistan",
 *             "region": "Asia",
 *             "alpha2code": "AF",
 *             "alpha3code": "AFG",
 *             "deleted": false,
 *             "created_at": "2021-07-09T21:20:05.048Z",
 *             "updated_at": "2021-07-09T21:20:05.050Z",
 *             "deleted_at": null,
 *             "phone_prefix": {
 *                 "id": 1,
 *                 "prefix": "93",
 *                 "flag": "https://restcountries.eu/data/afg.svg",
 *                 "deleted": false,
 *                 "created_at": "2021-07-14T16:40:20.660Z",
 *                 "updated_at": "2021-07-14T16:40:20.660Z",
 *                 "deleted_at": null,
 *                 "country_id": 1
 *              }
 *           }
 */
indexRoute.get(
    '/bch', 
    validateRequest,
    controller.getBchIndex
  );

  export default indexRoute;
