import { Request, Response } from "express";
import BaseController from "./_base.controller";
import userService from "../services/user.service";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dayjs from 'dayjs';
import { InternalError, BadRequestError } from "../errors";


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

    public login = async (req: Request, res: Response) => {
        console.log('req.COOKIES:', req.cookies);
        try {
            const { email } = req.body;
            req.session.user = await userService.findUserByEmail(email);
            console.log('Header: ', res.header);
            res.json({ user: req.session.user });
        } catch (error) {
            console.log(error);
            throw new InternalError();
        }
    };

    public current = async (req: Request, res: Response) => {
        console.log('req.COOKIES:', req.cookies);
        if (!req.session.user) {
            res.status(404).send({ currentUser: null });
        } else {
            const user: any = req.session.user;
            res.send({ currentUser: user || null });
        }
    };

    public logout = async (req: Request, res: Response) => {
        console.log('req.COOKIES:', req.cookies);
        req.session.destroy((err) => {
            if (err) throw new BadRequestError('Error destroying session');
        });
        res.status(200).send('Session logged out');
    };

}

export default UserController;