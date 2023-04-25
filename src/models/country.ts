import { prop, getModelForClass } from '@typegoose/typegoose';

class Country {
  @prop({ unique: true })
  name: string;

  @prop({ unique: true })
  code: string;

  @prop()
  flag: string;

  @prop()
  teams: [];

  @prop()
  leagues: [];

  @prop()
  cups: [];
}

const CountryModel = getModelForClass(Country);
export default CountryModel;