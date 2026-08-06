interface QueuePayload {
  roomId: string;
  senderId: string;
  encryptedContent: any;
  timestamp: Date;
}

export class MessageQueue {
  private static buffer: QueuePayload[] = [];
  private static isFlushing = false;

  public static enqueue(payload: QueuePayload) {
    this.buffer.push(payload);
    
    if (this.buffer.length >= 10 || !this.isFlushing) {
      this.flushQueue();
    }
  }

  private static async flushQueue() {
    if (this.buffer.length === 0 || this.isFlushing) return;
    this.isFlushing = true;

    const messagesToInsert = [...this.buffer];
    this.buffer = [];

    try {
      console.log(`[MessageQueue] Batch inserting ${messagesToInsert.length} encrypted messages into Database...`);
      // In production: Prisma createMany for optimal performance
    } catch (e) {
      console.error('[MessageQueue] Failed to insert batch, restoring buffer', e);
      this.buffer = [...messagesToInsert, ...this.buffer];
    } finally {
      this.isFlushing = false;
    }
  }
}
