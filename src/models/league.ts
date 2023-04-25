import { prop, getModelForClass } from '@typegoose/typegoose';

class League {
  @prop({ required: true, unique: true })   // mongoose
  league_id: number;                        // typescript

  @prop()
  name: string;

  @prop()
  type: string;

  @prop()
  logo: string;

  @prop()
  country: {
    name: string;
    code: string;
    flag: string;
  };

  @prop()
  seasons: [];

  @prop()
  fixtures: [];
}

const LeagueModel = getModelForClass(League);
export default LeagueModel;
