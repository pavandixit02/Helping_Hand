import { Queue, Worker, Job } from 'bullmq';
// import { config } from '../../config/env';

const connection = {
  url: process.env.REDIS_URL || 'redis://localhost:6379',
};

// Notification Queue
export const notificationQueue = new Queue('notifications', { connection });

// Generic Worker setup
export const setupWorker = (queueName: string, processor: (job: Job) => Promise<any>) => {
  const worker = new Worker(queueName, processor, { connection });

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} has completed!`);
  });

  worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} has failed with ${err.message}`);
  });

  return worker;
};
