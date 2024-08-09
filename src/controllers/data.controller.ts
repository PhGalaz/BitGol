import { Request, Response } from 'express';
import BaseController from './_base.controller';
import CountryModel from '../models/country';
import LeagueModel from '../models/league';
import LiveModel from '../models/live';
import BetModel from '../models/bet';
import { FixtureModel } from '../models/fixture';
import { NotFoundError } from '../errors/not-found-error';

class DataController extends BaseController {
   public getCountries = async (_req: Request, res: Response) => {
    const countries = await CountryModel.find();
    res.status(200).send(countries);
  };

  public getLeagues = async (_req: Request, res: Response) => {
    const leagues = await LeagueModel.find();
    res.status(200).send(leagues);
  };
  
  public getLives = async (_req: Request, res: Response) => {
    const lives = await LiveModel.find();
    res.status(200).send(lives);
  };

  public getBets = async (_req: Request, res: Response) => {
    const bets = await BetModel.find().populate('fixture');
    console.log(bets)
    res.status(200).send(bets);
  };

  public getFixtureById = async (req: Request, res: Response) => {
    const id = parseInt(req.query.id as string);
    console.log(id)
    const fixture = await FixtureModel.findOne({ id: id }).lean()
    if (!fixture) throw new NotFoundError();
    res.status(200).send(fixture);
  };

  public getNextFixtures = async (_req: Request, res: Response) => {
    const fixtures = await FixtureModel.find().lean()
    res.status(200).send(fixtures);
  };

  // public getOne = async (_req: Request, res: Response) => {
  //   // const { id } = req.params;
  //   // const country = await Country.findById(id);
  //   // if (!country) throw new NotFoundError();
  //   res.status(200).send('good');
  // };
}

export default DataController;
