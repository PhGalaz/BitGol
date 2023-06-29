import { Router } from 'express';
import UserController from '../controllers/users.controller';
import { validateRequest, currentUser } from '../middlewares';
import UsersValidator from '../validators/users.validator';

const usersController = new UserController();
const usersValidator = new UsersValidator();
const usersRoute = Router();

/**
 * @swagger
 * /users/signup/users:
 *  post:
 *     description: Create client
 *     tags:
 *       - Users
 *     parameters:
 *      - in: body
 *        name: body
 *        description: "Client fields"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/create-client"
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
 *   create-client:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *       last_name:
 *         type: string
 *         required: false
 *       email:
 *         type: string
 *         required: true
 *       password:
 *         type: string
 *         required: true
 */
usersRoute.post(
    '/signup/users',
    usersValidator.userFields,
    usersValidator.validateIfEmailExists,
    validateRequest,
    usersController.signUpUser
);

/**
 * @swagger
 * /users/confirm-user:
 *   patch:
 *     description:
 *       "Confirm user endpoint"
 *     tags:
 *       - Users
 *     summary: "Confirm User endpoint"
 *     consumes:
 *      - "application/json"
 *     produces:
 *      - "application/json"
 *     parameters:
 *      - in: body
 *        name: body
 *        description: "sent token(valid for 24hrs since creation) and userId"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/confirm-user"
 *     responses:
 *       200:
 *         description: user confirmed sucessfully
 *         examples:
 *           application/json: {
 *            "id": 23,
 *            "name": "magaly",
 *            "last_name": "arnez",
 *            "maternal_name": "",
 *            "phone": null,
 *            "email": "maguiarnez@hotmail.com",
 *            "password": "$2b$10$FdNte1OhjziAlTOc.15WBO4C6D.c0bIUQqElgS8ciB.Ze.69kkPbK",
 *            "token": "1624735289514.a8aae0de5cc3f758e64d9fb001d090",
 *            "deleted": false,
 *            "created_at": "2021-06-26T19:21:29.677Z",
 *            "updated_at": "2021-06-26T19:35:50.073Z",
 *            "deleted_at": null,
 *            "role_id": 1,
 *            "status_id": 2
 *           }
 *       400:
 *         description: token not valid
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               type: object
 *         examples:
 *           application/json: {
 *            "errors": [
 *              {
 *                "message": "token not valid"
 *              }
 *            ]
 *           }
 *       404:
 *         description: user not found
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               type: object
 *         examples:
 *           application/json: {
 *            "errors": [
 *              {
 *                "message": "Not found"
 *              }
 *            ]
 *           }
 * definitions:
 *   confirm-user:
 *     type: object
 *     properties:
 *       token:
 *         type: string
 *         required: true
 *       userId:
 *         type: string
 *         required: true
 */
usersRoute.patch(
    '/confirm-user', 
    usersValidator.validateConfirmUser, 
    validateRequest, 
    usersController.confirmAccountUser
);

/**
 * @swagger
 * /users/login:
 *  post:
 *    description: Login user
 *    tags:
 *      - Users
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: body
 *        description: "Login fields"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/login"
 *    responses:
 *     200:
 *      description: login success
 *      examples:
 *       application/json: {
 *        "token": am1m0m01m0m1f89784g12ged798hgj9dsda
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
 *                 "message": "Incorrect password"
 *             ],
 *          }
 * definitions:
 *   login:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         required: true
 *       password:
 *         type: string
 *         required: true
 */
usersRoute.post(
    '/login',
    usersValidator.login,
    usersValidator.validateCredentials,
    validateRequest,
    usersController.login
);

/**
 * @swagger
 * /users/current-user:
 *  get:
 *    description: Get current user by token
 *    tags:
 *      - Users
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *       description: decrypted token success
 *       examples:
 *        application/json: {
 *         "currentUser": {
 *             "id": 1,
 *             "name": "jose carkis",
 *             "last_name": "barrega",
 *             "maternal_name": "",
 *             "avatar": null,
 *             "email": "jose.barriga@loop.com",
 *             "phone": null,
 *             "role": {
 *                 "id": 1,
 *                 "name": "Client"
 *             },
 *             "status": {
 *                 "id": 2,
 *                 "name": "Activo"
 *             },
 *             "client": {
 *                 "id": 1,
 *                 "address": null,
 *                 "zip_code": null,
 *                 "birthday": null,
 *                 "gender": null
 *             },
 *             "producer": null,
 *             "iat": 1624240334,
 *             "exp": 1624845134
 *           }
 *         }
 *     404:
 *       description: decrypted token not founded
 *       schema:
 *         type: object
 *         properties:
 *           errors:
 *             type: object
 *       examples:
 *         application/json: {
 *           "currentUser": null
 *         }
 *
 */
usersRoute.get(
    '/current-user',
    // currentUser,
    usersController.current
);

/**
 * @swagger
 * /users/logout:
 *  get:
 *    description: Logout user (client and producer) by sending token
 *    tags:
 *      - Users
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
usersRoute.delete(
    '/logout',
    currentUser,
    usersController.logout
);

export default usersRoute;