import { prop, getModelForClass } from '@typegoose/typegoose';

class BchPrice {
    @prop()
    price: number;
    
    @prop()
    volume_24h: number;

    @prop()
    percent_change_1h: number;

    @prop()
    percent_change_24h: number;

    @prop()
    percent_change_7d: number;

    @prop()
    percent_change_30d: number;

    @prop()
    percent_change_60d: number;

    @prop()
    percent_change_90d: number;
}

const BchPriceModel = getModelForClass(BchPrice);
export default BchPriceModel;
