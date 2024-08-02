import { IBetCreationRequest } from "../interfaces/bet.interface";

const bchService = {
    getAddress: (bet: IBetCreationRequest) => {
        return 'bitcoincash:qz8zj7zq6p5j45wzj96z48zj7zq6p5j45wzj96z4'
    }
}

export default bchService;