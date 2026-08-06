import { VectorStore } from '../rag/VectorStore';
import { PromptRegistry } from '../prompt/PromptRegistry';
import { AIGateway, AIProvider } from '../gateway/AIGateway';

export class SpecialistMatcher {
  private vectorStore: VectorStore;
  private promptRegistry: PromptRegistry;
  private gateway: AIGateway;

  constructor() {
    this.vectorStore = new VectorStore();
    this.promptRegistry = new PromptRegistry();
    this.gateway = new AIGateway();
  }

  async recommendSpecialists(symptoms: string) {
    // 1. Use LLM to extract keywords/specialties from symptoms
    const prompt = this.promptRegistry.render('SPECIALIST_MATCHER', { symptoms });
    
    // Using Gemini as per prompt registry default
    const extraction = await this.gateway.generate(AIProvider.GEMINI, [
      { role: 'user', content: prompt }
    ], { temperature: 0.1 });

    let specialties: string[] = [];
    try {
      // Clean up markdown JSON blocks if present
      const jsonStr = extraction.content.replace(/```json/g, '').replace(/```/g, '').trim();
      specialties = JSON.parse(jsonStr);
    } catch (e) {
      console.error('Failed to parse specialty JSON', extraction.content);
      // Fallback: semantic search directly with symptoms
      specialties = [symptoms];
    }

    // 2. Perform Vector Search using the extracted specialties or symptoms
    const searchString = specialties.join(' ');
    const matches = await this.vectorStore.similaritySearchPartners(searchString, 5);

    // 3. Post-process ranking (could factor in distance, ratings here)
    const ranked = matches.sort((a, b) => b.similarity - a.similarity);

    return ranked;
  }
}
