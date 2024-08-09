import { prop, getModelForClass } from '@typegoose/typegoose';

class Fixture {
    @prop({ required: true, unique: true })
    id: number;

    @prop({ type: () => Object })  // Or define a more specific type if possible
    fixture: Record<string, any>;

    @prop({ type: () => Object })
    league: Record<string, any>;

    @prop({ type: () => Object })
    teams: Record<string, any>;

    @prop({ type: () => Object })
    goals: Record<string, any>;

    @prop({ type: () => Object })
    score: Record<string, any>;
}

const FixtureModel = getModelForClass(Fixture);
export { FixtureModel, Fixture };

