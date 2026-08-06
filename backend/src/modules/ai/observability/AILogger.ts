import { prisma } from '../../../infrastructure/prisma';
import { AIProvider } from '../gateway/AIGateway';

export class AILogger {
  async logInteraction(
    promptId: string, 
    userId: string, 
    model: string, 
    promptText: string, 
    response: string, 
    latencyMs: number, 
    tokensUsed: number,
    cost: number = 0
  ) {
    try {
      await prisma.promptLog.create({
        data: {
          promptId,
          userId,
          model,
          promptText, // In production, this should be PII-scrubbed
          response,
          latencyMs,
          tokensUsed,
          cost
        }
      });
      console.log(`[AI Logger] Logged interaction for user ${userId}, model ${model}, latency ${latencyMs}ms`);
    } catch (e) {
      console.error("[AI Logger] Failed to save log to database.", e);
    }
  }
}
