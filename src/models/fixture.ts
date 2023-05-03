import { prop, getModelForClass } from '@typegoose/typegoose';

class Fixture {
    @prop({ required: true, unique: true })
    fixture_id: number;    
    
    @prop()
    league_id: number;

    @prop()
    event_date: Date;

    @prop()
    event_timestamp: number;

    @prop()
    round: string;

    @prop()
    status: string;

    @prop()
    venue: [];

    @prop()
    homeTeam: [];

    @prop()
    awayTeam: [];

    @prop()
    score: [];

    @prop()
    league: [];
}

const FixtureModel = getModelForClass(Fixture);
export default FixtureModel;
