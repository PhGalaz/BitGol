import { updateIndex, indexTask } from './index.cron';
import { updateLives, livesTask } from './lives.cron';

export const runCron = () => {
    updateIndex();
    updateLives();
    indexTask.start();
    livesTask.start();
}
