import { aiGateway } from '../providers/AIGateway';
import { PIIProtector } from '../security/PIIProtector';
import { PromptRegistry } from '../prompts/PromptRegistry';
import { TriageSystemPrompt } from './SystemPrompts';
import { CostTracker } from '../audit/CostTracker';

export class TriageAssistant {
  public async analyzeSymptoms(userId: string, symptoms: string) {
    const startTime = Date.now();
    
    // 1. Sanitize PII
    const safeSymptoms = PIIProtector.sanitize(symptoms);
    
    // 2. Fetch Prompt from Registry
    const prompt = PromptRegistry.getPrompt('triage_v1', { symptoms: safeSymptoms, history: 'None' });
    
    // 3. Call AI Gateway with strict guardrails
    const response = await aiGateway.generateCompletion(prompt, TriageSystemPrompt);
    
    // 4. Log Audit & Cost
    const latency = Date.now() - startTime;
    await CostTracker.logAudit(userId, 'triage_v1', response.model, prompt, response.content, latency, response.tokensUsed);
    
    return response.content;
  }
}
