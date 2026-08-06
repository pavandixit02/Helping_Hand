import { ProviderAdapter } from '../providers/ProviderAdapter';
import { OpenAIAdapter } from '../providers/OpenAIAdapter';
import { ChatMessage, AIResponse, AIEmbeddingResponse } from '../domain/AIGatewayInterface';

/**
 * AIGatewayService acts as the central router for all AI requests.
 * It manages provider selection, fallback logic, and interfaces with the Audit Service.
 */
export class AIGatewayService {
  private activeProvider: ProviderAdapter;
  private fallbackProvider: ProviderAdapter | null;

  constructor() {
    // Defaulting to OpenAI. In production, this can be dynamically set via env vars or feature flags.
    this.activeProvider = new OpenAIAdapter();
    this.fallbackProvider = null; // Can be set to GeminiAdapter or ClaudeAdapter
  }

  public setActiveProvider(provider: ProviderAdapter) {
    this.activeProvider = provider;
  }

  public setFallbackProvider(provider: ProviderAdapter) {
    this.fallbackProvider = provider;
  }

  async chat(messages: ChatMessage[], options?: any): Promise<AIResponse> {
    try {
      // 1. Send request to active provider
      const response = await this.activeProvider.generateChatResponse(messages, options);
      
      // 2. Log Audit (Fire and Forget or via Event Bus)
      this.logAudit(messages, response);

      return response;
    } catch (error) {
      console.error(`[AIGateway] Primary provider failed:`, error);
      
      // 3. Fallback logic
      if (this.fallbackProvider) {
        console.log(`[AIGateway] Falling back to secondary provider...`);
        return await this.fallbackProvider.generateChatResponse(messages, options);
      }
      throw error;
    }
  }

  async embed(text: string): Promise<AIEmbeddingResponse> {
    return await this.activeProvider.generateEmbedding(text);
  }

  async moderate(text: string): Promise<boolean> {
    const result = await this.activeProvider.moderateContent(text);
    return result.isSafe;
  }

  private logAudit(requestMessages: ChatMessage[], response: AIResponse) {
    // TODO: Intercept and send to Audit Module/DB
    // Insert into PromptLog table (via Prisma or Queue)
    // BullMQ.add('audit-log', { prompt: requestMessages, response, latency: response.latencyMs, tokens: response.tokensUsed })
    console.log(`[AIGateway Audit] Logged usage for ${response.provider}`);
  }
}
