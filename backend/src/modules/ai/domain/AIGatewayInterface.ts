export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  text: string;
  provider: string;
  model: string;
  latencyMs: number;
  tokensUsed: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  confidenceScore?: number;
}

export interface AIEmbeddingResponse {
  embedding: number[];
  provider: string;
  model: string;
  tokensUsed: number;
}

export interface AIGatewayInterface {
  generateChatResponse(messages: ChatMessage[], options?: any): Promise<AIResponse>;
  generateEmbedding(text: string): Promise<AIEmbeddingResponse>;
  moderateContent(text: string): Promise<{ isSafe: boolean; flaggedCategories: string[] }>;
}
