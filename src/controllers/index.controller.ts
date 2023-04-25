import { Request, Response } from 'express';
import BaseController from './_base.controller';
import BchPrice from '../models/bchIndex';

class IndexController extends BaseController {
  public getBchIndex = async (_req: Request, res: Response) => {
    const bchIndex = await BchPrice.find();
    res.status(200).send(bchIndex);
  };
}

export default IndexController;
