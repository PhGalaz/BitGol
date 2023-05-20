import { Request, Response } from "express";
import BaseController from "./_base.controller";
import userService from "../services/user.service";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dayjs from 'dayjs';
import { InternalError } from "../errors";


class UserController extends BaseController {
    private saltRound = 10;

    public signUpUser = async (req: Request, res: Response) => {
        try {
            const { name, lastName, email, password } = req.body;
            const roleId = 1;
            const hashedPassword = await bcrypt.hash(password, this.saltRound);
            const token = dayjs() + '.' + crypto.randomBytes(15).toString('hex');
            const newUser = await userService.createUser(name, lastName, email, hashedPassword, token, roleId);
            res.status(201).send(newUser);
        } catch (error) {
            console.log(error);
            throw new InternalError();
        }
    };

    public confirmAccountUser = async (req: Request, res: Response) => {
        try {
            const { token, userId } = req.body;
            const confirmedUser = await userService.confirmAccountUser(token, userId);
            res.status(200).send(confirmedUser);
        } catch (error) {
            console.log(error);
            throw new InternalError();
        }
    };
}

export default UserController;