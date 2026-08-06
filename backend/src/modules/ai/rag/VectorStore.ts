import { prisma } from '../../../infrastructure/prisma';
import { EmbeddingEngine } from './EmbeddingEngine';

export class VectorStore {
  private embeddingEngine: EmbeddingEngine;

  constructor() {
    this.embeddingEngine = new EmbeddingEngine();
  }

  async similaritySearchPartners(query: string, limit: number = 3) {
    const queryVector = await this.embeddingEngine.generateEmbedding(query);
    
    // Format vector for pgvector literal: '[0.1, 0.2, ...]'
    const vectorString = `[${queryVector.join(',')}]`;

    // Perform cosine similarity search (using <=> operator in pgvector)
    const matches = await prisma.$queryRawUnsafe<any[]>(`
      SELECT 
        "id", 
        "userId", 
        "firstName", 
        "lastName", 
        "specialty",
        1 - (embedding <=> $1::vector) as similarity
      FROM "PartnerProfile"
      WHERE embedding IS NOT NULL
      ORDER BY embedding <=> $1::vector
      LIMIT $2
    `, vectorString, limit);

    return matches;
  }

  // E.g. searching through medical guidelines or FAQ
  // This assumes a 'KnowledgeBase' table with a vector column
  async similaritySearchKnowledge(query: string, limit: number = 5) {
     const queryVector = await this.embeddingEngine.generateEmbedding(query);
     const vectorString = `[${queryVector.join(',')}]`;

     // Fallback mock if KnowledgeBase doesn't exist yet, avoiding crashes
     try {
       const matches = await prisma.$queryRawUnsafe<any[]>(`
         SELECT 
           "id", 
           "content", 
           "metadata",
           1 - (embedding <=> $1::vector) as similarity
         FROM "KnowledgeChunk"
         ORDER BY embedding <=> $1::vector
         LIMIT $2
       `, vectorString, limit);
       return matches;
     } catch (e) {
       console.warn("KnowledgeChunk table likely missing, returning mock data.");
       return [];
     }
  }
}
