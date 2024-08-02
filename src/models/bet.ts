import { prop, getModelForClass } from '@typegoose/typegoose';

class Bet {
  @prop({ required: true, unique: true })   // mongoose
  bet_id: number;                           // typescript

  @prop()
  created: Date;

  @prop()
  init_tx: string;

  @prop()
  init_amount: number;

  @prop()
  taken_amount: number;

  @prop()
  fixture_id: number;

  @prop()
  type: number;

  @prop()
  home_factor: number;

  @prop()
  away_factor: number;

  @prop()
  draw_factor: number;

  @prop()
  status: string;

  @prop()
  fixture: [];

  @prop()
  users: [];

  @prop()
  user: number;

  @prop()
  funding_address: string;
}

const BetModel = getModelForClass(Bet);
export default BetModel;
