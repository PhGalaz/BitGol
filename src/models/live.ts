import { prop, getModelForClass } from '@typegoose/typegoose';

class Live {
    @prop({ required: true, unique: true })    // mongoose
    fixture_id: number;                        // typescript
    
    @prop()
    league_id: number;
    
    @prop()
    league: [];

    @prop()
    score: [];
    
    @prop()
    event_date: Date;

    @prop()
    event_timestamp: number;

    @prop()
    firstHalfStart: number;

    @prop()
    secondHalfStart: number;

    @prop()
    round: string;

    @prop()
    status: string;

    @prop()
    statusShort: string;

    @prop()
    elapsed: number;

    @prop()
    venue: string;

    @prop()
    referee: string;

    @prop()
    homeTeam: [];

    @prop()
    awayTeam: [];

    @prop()
    goalsHomeTeam: number;
    
    @prop()
    goalsAwayTeam: number;
}

const LiveModel = getModelForClass(Live);
export default LiveModel;