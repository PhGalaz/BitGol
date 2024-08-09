import { updateIndex, indexTask } from './index.cron';
// import { updateLives, livesTask } from './lives.cron';
import { loadFixtures, fixturesTask } from './fixtures.cron';

export const runCron = () => {
    updateIndex();
    indexTask.start();
    // updateLives();
    // livesTask.start();
    // loadFixtures();
    // fixturesTask.start();
}
