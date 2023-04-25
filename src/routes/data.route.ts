import { Router } from 'express';
import { validateRequest } from '../middlewares';
// import CountriesValidator from '../validators/countries.validator';
import DataController from '../controllers/data.controller';

const controller = new DataController();
// const validator = new CountriesValidator();

const dataRoute = Router();

/**
 * @swagger
 * /data/countries:
 *   get:
 *     description:
 *       "Get all countries"
 *     summary: "get all countries endpoint"
 *     tags:
 *       - Data
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
dataRoute.get(
  '/countries', 
  validateRequest,
  controller.getCountries
);

// /**
//  * @swagger
//  * /countries/{id}:
//  *   get:
//  *     description:
//  *       "Get one country"
//  *     summary: "get one country endpoint"
//  *     tags:
//  *       - Data
//  *     responses:
//  *       200:
//  *         examples:
//  *           application/json: {
//  *             "id": 1,
//  *             "name": "United States of America",
//  *             "region": "Americas",
//  *             "alpha2code": "US",
//  *             "alpha3code": "USA",
//  *             "deleted": false,
//  *             "created_at": "2021-07-09T21:20:05.048Z",
//  *             "updated_at": "2021-07-09T21:20:05.050Z",
//  *             "deleted_at": null,
//  *             "phone_prefix": {
//  *                 "id": 1,
//  *                 "prefix": "1",
//  *                 "flag": "https://restcountries.eu/data/usa.svg",
//  *                 "deleted": false,
//  *                 "created_at": "2021-07-14T16:40:20.660Z",
//  *                 "updated_at": "2021-07-14T16:40:20.660Z",
//  *                 "deleted_at": null,
//  *                 "country_id": 1
//  *              },
//  *              "states": [
//  *                  {
//  *                      "name": "Alabama",
//  *                      "code": "AL",
//  *                      "deleted": false,
//  *                      "created_at": "2021-08-16T18:27:47.692Z",
//  *                      "updated_at": "2021-08-16T18:27:47.788Z",
//  *                      "deleted_at": null,
//  *                  }
//  *              ]
//  *           }
//  */
// dataRoute.get(
//   '/:id',
//   // validator.paramIdValidator,
//   validateRequest,
//   controller.getOne
// );

/**
 * @swagger
 * /data/leagues:
 *   get:
 *     description:
 *       "Get all leagues"
 *     summary: "get all leagues endpoint"
 *     tags:
 *       - Data
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
dataRoute.get(
  '/leagues', 
  validateRequest,
  controller.getLeagues
);

/**
 * @swagger
 * /data/lives:
 *   get:
 *     description:
 *       "Get all live games"
 *     summary: "get all live games endpoint"
 *     tags:
 *       - Data
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
dataRoute.get(
  '/lives', 
  validateRequest,
  controller.getLives
);

/**
 * @swagger
 * /data/bets:
 *   get:
 *     description:
 *       "Get all open bets"
 *     summary: "get all open bets endpoint"
 *     tags:
 *       - Data
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
dataRoute.get(
  '/bets', 
  validateRequest,
  controller.getBets
);

/**
 * @swagger
 * /data/fixture:
 *   get:
 *     description:
 *       "Get fixture by id"
 *     summary: "get fixture by id endpoint"
 *     tags:
 *       - Data
 *     parameters:
 *      - name: id
 *        in: query
 *        required: true
 *        type: number
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
dataRoute.get(
  '/fixture', 
  validateRequest,
  controller.getFixtureById
);

/**
 * @swagger
 * /data/fixtures:
 *   get:
 *     description:
 *       "Get fixtures by id"
 *     summary: "get fixture by id endpoint"
 *     tags:
 *       - Data
 *     parameters:
 *      - name: id
 *        in: query
 *        required: true
 *        type: number
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
dataRoute.get(
  '/fixtures',
  validateRequest,
  controller.getNextFixtures
);

export default dataRoute;
