import cron from 'node-cron';
import { prisma } from '@/src/lib/prisma.js';
import { logger } from '@/src/lib/logger';

let jobStarted = false;

export function startCleanupJob() {
  if (jobStarted) {
    return;
  }
  jobStarted = true;

  cron.schedule('0 */6 * * *', async () => {
    try {
      logger.info('Running cleanup cron job...');
      await deleteCompletedTodos();
    } catch (err) {
      logger.error('Cron job failed:', err);
    }
  });
}

async function deleteCompletedTodos() {
  const result = await prisma.todo.deleteMany({
    where: { completed: true },
  });
  logger.info(`The number of deleted completed tasks: ${result.count}`);
}