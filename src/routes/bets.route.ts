import { Router } from 'express';
import BetsController from '../controllers/bets.controller';
import { validateRequest, currentUser } from '../middlewares';
// import BetsValidator from '../validators/bets.validator';

const betsController = new BetsController();
// const betsValidator = new BetsValidator();
const betsRoute = Router();

/**
 * @swagger
 * /bets/create-single:
 *  post:
 *     description: Create a new bet to be funded
 *     tags:
 *       - Bets
 *     parameters:
 *      - in: body
 *        name: body
 *        description: "New bet fields"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/create-single"
 *     responses:
 *      201:
 *        description: register successfully
 *        examples:
 *          application/json: {
 *             "id": 2,
 *             "name": "Luis",
 *             "last_name": "Jiménez",
 *             "maternal_name": "",
 *             "phone": null,
 *             "email": "luisj@gmail.com",
 *             "password": "$2b$10$fKfWwNnFl8akpezlrEYv/OVrjt9CQmh50LgpGq7E7uCMRLr6HJ/A2",
 *             "token": "1624724677111.49c59bbcf85b7c79b1d9eaf89be717",
 *             "deleted": false,
 *             "created_at": "2021-06-26T16:24:37.127Z",
 *             "updated_at": "2021-06-26T16:24:37.127Z",
 *             "deleted_at": null,
 *             "role_id": 1,
 *             "status_id": 2
 *             }
 *      400:
 *       schema:
 *         type: object
 *         properties:
 *           errors:
 *             type: object
 *       examples:
 *         application/json: {
 *           "errors": [
 *             {
 *               "message": "Email: pedrop@gmail.com exists in db"
 *             },
 *             {
 *               "message": "Invalid value",
 *               "field": "email"
 *             },
 *             {
 *               "message": "Email is required",
 *               "field": "email"
 *             },
 *             {
 *               "message": "Invalid value",
 *               "field": "email"
 *             },
 *             {
 *               "message": "Email format is not valid",
 *               "field": "email"
 *              }
 *            ],
 *          }
 * definitions:
 *   create-single:
 *     type: object
 *     properties:
 *       home_factor:
 *         type: number
 *         required: true
 *       away_factor:
 *         type: number
 *         required: true
 *       draw_factor:
 *         type: number
 *         required: true
 *       fixture_id:
 *         type: number
 *         required: true
 */
betsRoute.post(
    '/create-single',
    // currentUser,
    validateRequest,
    betsController.createSingleBet
);

export default betsRoute;