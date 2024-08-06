import { bchjs, bNode } from '../config/psfBch.config';
import Bet from '../models/bet';
class BchService {
    public emitBetAddresses = async () => {
        const index = await Bet.countDocuments();
        console.log('index:', index);
        const betsNode = bchjs.HDNode.derive(bNode, 0);
        const betNode = bchjs.HDNode.derive(betsNode, index);
        const betFundingAddress = bchjs.HDNode.toCashAddress(bchjs.HDNode.derive(betNode, 0));
        const betTakingAddress = bchjs.HDNode.toCashAddress(bchjs.HDNode.derive(betNode, 1));

        return { betFundingAddress, betTakingAddress, index };
    }
}

export default BchService;