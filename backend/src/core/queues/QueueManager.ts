import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

export class QueueManager {
  private redisConnection: IORedis;
  private queues: Map<string, Queue> = new Map();
  private workers: Map<string, Worker> = new Map();

  constructor() {
    this.redisConnection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
      maxRetriesPerRequest: null, // Required by BullMQ
    });
  }

  createQueue(name: string): Queue {
    if (!this.queues.has(name)) {
      const queue = new Queue(name, { connection: this.redisConnection });
      this.queues.set(name, queue);
    }
    return this.queues.get(name)!;
  }

  createWorker(name: string, processor: (job: any) => Promise<any>): Worker {
    if (!this.workers.has(name)) {
      const worker = new Worker(name, processor, { connection: this.redisConnection });
      
      worker.on('completed', job => {
        console.log(`Job ${job.id} completed successfully in queue ${name}`);
      });
      
      worker.on('failed', (job, err) => {
        console.error(`Job ${job?.id} failed in queue ${name}: ${err.message}`);
      });

      this.workers.set(name, worker);
    }
    return this.workers.get(name)!;
  }

  async addJob(queueName: string, jobName: string, data: any) {
    const queue = this.createQueue(queueName);
    return await queue.add(jobName, data);
  }
}
