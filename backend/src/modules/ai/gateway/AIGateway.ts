import { OpenAI } from 'openai';
import { GoogleGenAI } from '@google/genai';
import Anthropic from '@anthropic-ai/sdk';

export enum AIProvider {
  OPENAI = 'OPENAI',
  GEMINI = 'GEMINI',
  ANTHROPIC = 'ANTHROPIC',
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIGatewayOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export interface AIResponse {
  content: string;
  provider: AIProvider;
  modelUsed: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export class AIGateway {
  private openai: OpenAI | null = null;
  private gemini: GoogleGenAI | null = null;
  private anthropic: Anthropic | null = null;

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    if (process.env.GEMINI_API_KEY) {
      this.gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    if (process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    }
  }

  async generate(provider: AIProvider, messages: ChatMessage[], options: AIGatewayOptions = {}): Promise<AIResponse> {
    switch (provider) {
      case AIProvider.OPENAI:
        return this.generateOpenAI(messages, options);
      case AIProvider.GEMINI:
        return this.generateGemini(messages, options);
      case AIProvider.ANTHROPIC:
        return this.generateAnthropic(messages, options);
      default:
        throw new Error(`Provider ${provider} is not supported.`);
    }
  }

  private async generateOpenAI(messages: ChatMessage[], options: AIGatewayOptions): Promise<AIResponse> {
    if (!this.openai) throw new Error('OpenAI API key not configured.');
    
    const model = options.model || 'gpt-4o';
    const response = await this.openai.chat.completions.create({
      model,
      messages: messages as any,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens,
    });

    return {
      content: response.choices[0]?.message?.content || '',
      provider: AIProvider.OPENAI,
      modelUsed: model,
      usage: {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      }
    };
  }

  private async generateGemini(messages: ChatMessage[], options: AIGatewayOptions): Promise<AIResponse> {
    if (!this.gemini) throw new Error('Gemini API key not configured.');

    const model = options.model || 'gemini-2.5-pro';
    
    // Convert generic messages to Gemini format
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : m.role === 'system' ? 'user' : 'user', // Basic mapping, system prompts need specific handling in true integration
      parts: [{ text: m.content }]
    }));

    // In a real integration, we'd handle system instructions separately for Gemini
    const systemMessage = messages.find(m => m.role === 'system');
    const userMessages = contents.filter(c => c.role !== 'system');

    const response = await this.gemini.models.generateContent({
      model,
      contents: userMessages,
      config: {
        systemInstruction: systemMessage?.content,
        temperature: options.temperature ?? 0.7,
        maxOutputTokens: options.maxTokens,
      }
    });

    return {
      content: response.text || '',
      provider: AIProvider.GEMINI,
      modelUsed: model,
      usage: {
        promptTokens: response.usageMetadata?.promptTokenCount || 0,
        completionTokens: response.usageMetadata?.candidatesTokenCount || 0,
        totalTokens: response.usageMetadata?.totalTokenCount || 0,
      }
    };
  }

  private async generateAnthropic(messages: ChatMessage[], options: AIGatewayOptions): Promise<AIResponse> {
    if (!this.anthropic) throw new Error('Anthropic API key not configured.');

    const model = options.model || 'claude-3-5-sonnet-latest';
    const systemMessage = messages.find(m => m.role === 'system');
    const userMessages = messages.filter(m => m.role !== 'system').map(m => ({
      role: m.role === 'user' ? 'user' as const : 'assistant' as const,
      content: m.content
    }));

    const response = await this.anthropic.messages.create({
      model,
      system: systemMessage?.content,
      messages: userMessages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens || 4096,
    });

    return {
      content: response.content[0].type === 'text' ? response.content[0].text : '',
      provider: AIProvider.ANTHROPIC,
      modelUsed: model,
      usage: {
        promptTokens: response.usage.input_tokens,
        completionTokens: response.usage.output_tokens,
        totalTokens: response.usage.input_tokens + response.usage.output_tokens,
      }
    };
  }
}
