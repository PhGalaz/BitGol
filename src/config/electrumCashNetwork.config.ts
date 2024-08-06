import { ElectrumClient, ElectrumTransport } from "electrum-cash";

const electrumClient = new ElectrumClient('Electrum client example', '1.4.1', 'bch.imaginary.cash');

async function main() {
    try {
        await electrumClient.connect();
        console.log('Connected to Electrum server');
    } catch (error) {
        console.error('Error connecting to Electrum server:', error);
    }
}

export default main;