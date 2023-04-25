import cron from 'node-cron';
import { ApiFootball } from '../utils/axios';
import LiveModel from '../models/live';
import { wss } from '../config/ws.config';

export const livesTask = cron.schedule('*/45 * * * *', () => {
    updateLives();
});

export async function updateLives() {
    const live = new ApiFootball('fixtures/live');
    try {
        const lives = await live.get();
        let livegames = lives?.data.api.fixtures;
        await refreshLives(livegames);
        console.log('\x1b[96mLives\x1b[0m updated at ' + new Date().toLocaleString(), `\x1b[96m${livegames.length}\x1b[0m`);
        livegames = await LiveModel.find();
        const prePack = [{ event: 'lives', data: livegames }]
        const pack = JSON.stringify(prePack)
        wss.clients.forEach((client) => {
            client.send(pack);       
        });
    } catch (error) {
        console.error(error)
    }
}

async function refreshLives(livegames: any) {
    await LiveModel.deleteMany();
    // emitLives(livegames)
    for (let livegame of livegames) {
      await LiveModel.create({
        fixture_id: livegame.fixture_id,
        league_id: livegame.league_id,
        league: livegame.league,
        event_date: livegame.event_date,
        event_timestamp: livegame.event_timestamp,
        firstHalfStart: livegame.firstHalfStart,
        secondHalfStart: livegame.secondHalfStart,
        round: livegame.round,
        status: livegame.status,
        statusShort: livegame.statusShort,
        elapsed: livegame.elapsed,
        venue: livegame.venue,
        referee: livegame.referee,
        homeTeam: livegame.homeTeam,
        awayTeam: livegame.awayTeam,
        goalsHomeTeam: livegame.goalsHomeTeam,
        goalsAwayTeam: livegame.goalsAwayTeam,
        score: livegame.score
      })
    }
}