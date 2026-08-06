import { AIGatewayInterface, ChatMessage, AIResponse, AIEmbeddingResponse } from '../domain/AIGatewayInterface';

/**
 * Abstract Base Class for Provider Adapters (OpenAI, Gemini, Claude)
 * Enforces standard return types for the AI Gateway.
 */
export abstract class ProviderAdapter implements AIGatewayInterface {
  protected providerName: string;
  protected defaultModel: string;

  constructor(providerName: string, defaultModel: string) {
    this.providerName = providerName;
    this.defaultModel = defaultModel;
  }

  abstract generateChatResponse(messages: ChatMessage[], options?: any): Promise<AIResponse>;
  abstract generateEmbedding(text: string): Promise<AIEmbeddingResponse>;
  abstract moderateContent(text: string): Promise<{ isSafe: boolean; flaggedCategories: string[] }>;
}
