const BCHJS = require("@psf/bch-js")
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const bchjs = new BCHJS({ 
    restURL: process.env.BCHN_MAINNET,
})

let bNode: any = null;

const initializeAddressEmitter = async () => {
    if (!bNode) {
        
        // // // const mnemonic = process.env.MNEMONIC!;
        // // // const seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
        // // // const parent = bchjs.HDNode.fromSeed(seedBuffer);
        // // // const index = 1;
        // // // const bitgolHDNode = bchjs.HDNode.deriveHardened(parent, index);
        // // // const XPub = bchjs.HDNode.toXPub(bitgolHDNode);

        const bitgolXPub = process.env.MASTER_X_PUB!;
        bNode = bchjs.HDNode.fromXPub(bitgolXPub);
    }
    console.log('bNode initialized');
};

export { bchjs, initializeAddressEmitter, bNode };