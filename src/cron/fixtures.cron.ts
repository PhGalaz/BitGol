import cron from 'node-cron';
import { ApiFutbol } from '../utils/axios';
import { FixtureModel } from '../models/fixture';
// import { wss } from '../config/ws.config';
import dayjs from 'dayjs';

export const fixturesTask = cron.schedule('*/45 * * * *', () => {
    loadFixtures();
});

export async function loadFixtures() {
    try {
        const today = dayjs().format('YYYY-MM-DD');
        const fixturesToday = await ApiFutbol.get('fixtures', { date: today });
        const fixturesTodayArray = fixturesToday?.data.response;
        await upsertFixtures(fixturesTodayArray);
        // const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD'); 
        // const fixturesTomorrow = await ApiFutbol.get('fixtures', { date: tomorrow });
        // const fixturesTomorrowArray = fixturesTomorrow?.data.response;
        // await upsertFixtures(fixturesTomorrowArray);
        console.log('\x1b[96mFixtures\x1b[0m updated at ' + new Date().toLocaleString(), `\x1b[96m${fixturesTodayArray.length + fixturesTomorrowArray}\x1b[0m`);
    } catch (error) {
        console.error(error)
    }
}

async function upsertFixtures(fixtures: any) {
    for (let fixture of fixtures) {
        console.log(fixture)
        await FixtureModel.updateOne({
            id: fixture.fixture.id
        },{
            id: fixture.id,
            fixture: fixture.fixture,
            league: fixture.league,
            teams: fixture.teams,
            goals: fixture.goals,
            score: fixture.score,
        },{
            upsert: true
        }).catch((error: any) => {
            if(error.code == 11000){
                console.log(error)
            }
        })
    }
}