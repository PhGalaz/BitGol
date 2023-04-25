import cron from 'node-cron';
import { ApiCmc } from '../utils/axios';
import BchPriceModel from '../models/bchIndex';
import { wss } from '../config/ws.config';

export const indexTask = cron.schedule('*/20 * * * *', () => {
    updateIndex();
});

export async function updateIndex() {
    const bch = new ApiCmc('cryptocurrency/quotes/latest?id=1831');
    try {
        const bchIndex = await bch.get();
        const data = bchIndex!.data.data["1831"].quote.USD;
        await saveBchInfo(data);
        console.log('\x1b[32mIndex\x1b[0m updated at ' + new Date().toLocaleString(), `\x1b[32m${data.price}\x1b[0m`);
        const prePack = [{ event: 'bchinfo', data: data }]
        const pack = JSON.stringify(prePack)
        wss.clients.forEach((client) => {
            client.send(pack);       
        });
    } catch (error) {
        console.error(error)
    }
}

//Save bch info to db
async function saveBchInfo(data: any) {
    await BchPriceModel.deleteMany();
    await BchPriceModel.create({
      price: data.price,
      volume_24h: data.volume_24h,
      percent_change_1h: data.percent_change_1h,
      percent_change_24h: data.percent_change_24h,
      percent_change_7d: data.percent_change_7d,
      percent_change_30d: data.percent_change_30d,
      percent_change_60d: data.percent_change_60d,
      percent_change_90d: data.percent_change_90d,
      market_cap: data.market_cap,
      market_cap_dominance: data.market_cap_dominance,
      fully_diluted_market_cap: data.fully_diluted_market_cap,
      last_updated: data.last_updated
    })
  }