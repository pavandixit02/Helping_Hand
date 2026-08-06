export type AIProvider = 'OPENAI' | 'GEMINI' | 'CLAUDE';

export interface AIResponse {
  content: string;
  tokensUsed: number;
  model: string;
}

export class AIGateway {
  private primaryProvider: AIProvider;

  constructor(defaultProvider: AIProvider = 'OPENAI') {
    this.primaryProvider = defaultProvider;
  }

  public async generateCompletion(prompt: string, systemPrompt?: string): Promise<AIResponse> {
    try {
      return await this.routeToProvider(this.primaryProvider, prompt, systemPrompt);
    } catch (error) {
      console.warn(`Primary provider ${this.primaryProvider} failed. Triggering fallback...`);
      return await this.fallbackRouting(prompt, systemPrompt);
    }
  }

  private async routeToProvider(provider: AIProvider, prompt: string, systemPrompt?: string): Promise<AIResponse> {
    // Abstracted implementation logic for SDKs
    switch (provider) {
      case 'OPENAI':
        return { content: 'Mock OpenAI Response', tokensUsed: 42, model: 'gpt-4o' };
      case 'GEMINI':
        return { content: 'Mock Gemini Response', tokensUsed: 38, model: 'gemini-1.5-pro' };
      case 'CLAUDE':
        return { content: 'Mock Claude Response', tokensUsed: 45, model: 'claude-3-opus' };
      default:
        throw new Error('Unsupported Provider');
    }
  }

  private async fallbackRouting(prompt: string, systemPrompt?: string): Promise<AIResponse> {
    const fallbacks: AIProvider[] = ['GEMINI', 'CLAUDE', 'OPENAI'].filter(p => p !== this.primaryProvider) as AIProvider[];
    
    for (const fallback of fallbacks) {
      try {
        return await this.routeToProvider(fallback, prompt, systemPrompt);
      } catch (e) {
        console.warn(`Fallback ${fallback} failed.`);
      }
    }
    throw new Error('All AI Providers failed.');
  }
}

export const aiGateway = new AIGateway();
