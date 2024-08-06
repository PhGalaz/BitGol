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
 *    description: Ask for an address to fund a brand new bet
 *    tags:
 *      - Bets
 *    security:
 *     - bearerAuth: []
 *    produces:
 *      - application/json
 *    responses:
 *     200:
 *      description: logout success
 *      examples:
 *       application/json: {
 *        "token": null
 *       }
 *     400:
 *        schema:
 *          type: object
 *          properties:
 *            errors:
 *              type: object
 *        examples:
 *          application/json: {
 *            "errors": [
 *                 "message": "token not sent"
 *             ],
 *          }
 */
betsRoute.post(
    '/create-single',
    // currentUser,
    validateRequest,
    betsController.createSingleBet
);

export default betsRoute;