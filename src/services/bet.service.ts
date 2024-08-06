import { mongoose } from "@typegoose/typegoose";
import { IBetCreationRequest } from "../interfaces/bet.interface";
import BetModel from "../models/bet";
import BchService from "../services/bch.service";

const bchService = new BchService();
type Type = 233 | 223 | 213 | 231 | 232 | 322 | 332 | 312 | 321 | 323 | 123 | 132;

class BetService {
    public openRequest = async (bet: IBetCreationRequest) => {
        const { betFundingAddress, betTakingAddress, index } = await bchService.emitBetAddresses();
        const fixture = new mongoose.Types.ObjectId(bet.fixture_id)
        console.log('fixture:', fixture);
        const newBet = {
            ...bet,
            id: index,
            fixture: fixture,
            funding_address: betFundingAddress,
            taking_address: betTakingAddress
        }

        await new BetModel(newBet).save();
        return newBet;
    }

    public getBetType = (bet: any): Type => {
        function getDigit(value: number) {
            if (value < 1.00) return '3';
            if (value === 1.00) return '1';
            if (value > 1.00) return '2';
        }
        const a = getDigit(bet.home_factor);
        const b = getDigit(bet.draw_factor);
        const c = getDigit(bet.away_factor);

        return parseInt(a! + b! + c!) as Type;
    }
}

export default BetService;