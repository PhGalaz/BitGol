import { Request, Response } from "express";
import BaseController from "./_base.controller";
import BetService from "../services/bet.service";
import dayjs from "dayjs";
// import bcrypt from 'bcrypt';
// import crypto from 'crypto';
// import dayjs from 'dayjs';
import { InternalError } from "../errors";

const betService = new BetService();


class BetsController extends BaseController {
    public createSingleBet = async (req: Request, res: Response) => {
        try {
            const bet = req.body
            bet.type = await betService.getBetType(bet)
            bet.user_id = req.session.user ? req.session.user.id : null
            bet.status = 0 // 'created'
            bet.createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss')
            bet.init_amount = 0
            bet.taken_amount = 0
            console.log(bet);
            const savedBet = await betService.openRequest(bet)

            await new Promise(resolve => setTimeout(resolve, 2000));
            res.status(200).send(savedBet);
        } catch (error) {
            console.log(error);
            throw new InternalError();
        }
    };

}

export default BetsController;