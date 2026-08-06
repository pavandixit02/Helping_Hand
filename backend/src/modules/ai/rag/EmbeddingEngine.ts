import { OpenAI } from 'openai';
import { AIProvider } from '../gateway/AIGateway';

export class EmbeddingEngine {
  private openai: OpenAI | null = null;

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
  }

  async generateEmbedding(text: string, provider: AIProvider = AIProvider.OPENAI): Promise<number[]> {
    if (provider === AIProvider.OPENAI) {
      if (!this.openai) throw new Error('OpenAI API key not configured for embeddings.');
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
      });
      return response.data[0].embedding;
    }
    
    // Fallbacks to Gemini/Anthropic embeddings would go here if supported/requested
    throw new Error(`Embedding generation not supported for provider: ${provider}`);
  }

  async generateBatchEmbeddings(texts: string[], provider: AIProvider = AIProvider.OPENAI): Promise<number[][]> {
    if (provider === AIProvider.OPENAI) {
      if (!this.openai) throw new Error('OpenAI API key not configured.');
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: texts,
      });
      return response.data.map(d => d.embedding);
    }
    throw new Error(`Batch embedding generation not supported for provider: ${provider}`);
  }
}
