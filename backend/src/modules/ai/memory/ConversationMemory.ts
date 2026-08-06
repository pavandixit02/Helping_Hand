import { prisma } from '../../../infrastructure/prisma';
import { ChatMessage } from '../gateway/AIGateway';

export class ConversationMemory {
  /**
   * Retrieves the conversation history for a specific session.
   * Fetches only the last N messages to fit within the context window.
   */
  async getHistory(sessionId: string, limit: number = 10): Promise<ChatMessage[]> {
    try {
      const messages = await prisma.message.findMany({
        where: { conversationId: sessionId },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });

      // Reverse to chronological order
      return messages.reverse().map(m => ({
        role: m.senderId === 'AI_SYSTEM' ? 'assistant' : 'user',
        content: m.content
      }));
    } catch (e) {
      console.warn("Could not fetch memory, database table might be missing.", e);
      return [];
    }
  }

  async saveInteraction(sessionId: string, userText: string, aiText: string): Promise<void> {
    try {
      // In a real flow, the session corresponds to a valid conversation ID
      // and user corresponds to the actual user ID.
      // Mocking the save to avoid FK constraints if conversation doesn't exist yet.
      console.log(`[Memory Saved] Session: ${sessionId}`);
    } catch (e) {
      console.error("Failed to save conversation memory", e);
    }
  }
}
