import { Request, Response } from "express";
import BaseController from "./_base.controller";
import betService from "../services/bet.service";
import dayjs from "dayjs";
// import bcrypt from 'bcrypt';
// import crypto from 'crypto';
// import dayjs from 'dayjs';
import { InternalError } from "../errors";


class BetsController extends BaseController {
    public createSingleBet = async (req: Request, res: Response) => {
        try {
            const bet = req.body
            bet.user_id = req.session.user ? req.session.user._id : null
            bet.status = 1 //'pending'
            bet.createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss')
            bet.funding_address = await betService.openRequest(bet)

            await new Promise(resolve => setTimeout(resolve, 2000));
            res.status(200).send(bet);
        } catch (error) {
            console.log(error);
            throw new InternalError();
        }
    };

}

export default BetsController;