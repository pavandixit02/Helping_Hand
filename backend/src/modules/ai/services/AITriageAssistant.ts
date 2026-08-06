import { AIGateway, AIProvider, ChatMessage } from '../gateway/AIGateway';
import { PromptRegistry } from '../prompt/PromptRegistry';
import { AISafetyModule } from '../safety/AISafetyModule';
import { ConversationMemory } from '../memory/ConversationMemory';

export class AITriageAssistant {
  private gateway: AIGateway;
  private promptRegistry: PromptRegistry;
  private safetyModule: AISafetyModule;
  private memory: ConversationMemory;

  constructor() {
    this.gateway = new AIGateway();
    this.promptRegistry = new PromptRegistry();
    this.safetyModule = new AISafetyModule();
    this.memory = new ConversationMemory();
  }

  async processTriage(sessionId: string, userMessage: string, patientContext: Record<string, string>) {
    // 1. Safety check
    const isSafe = this.safetyModule.validateInput(userMessage);
    if (!isSafe) {
      return {
        content: "I'm sorry, I cannot process this request due to safety guidelines.",
        urgency: 'UNKNOWN'
      };
    }

    // 2. Load context and history
    const systemPromptText = this.promptRegistry.render('TRIAGE_ASSISTANT', {
      age: patientContext.age || 'Unknown',
      gender: patientContext.gender || 'Unknown',
      history: patientContext.history || 'None provided'
    });

    const history = await this.memory.getHistory(sessionId);
    
    // 3. Build messages
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPromptText },
      ...history,
      { role: 'user', content: userMessage }
    ];

    // 4. Generate AI response
    // For triage, let's use the default provider mapped in the registry
    const response = await this.gateway.generate(AIProvider.OPENAI, messages, {
      temperature: 0.3, // Low temperature for medical consistency
      maxTokens: 500
    });

    // 5. Output Validation (Guardrails)
    const safeOutput = this.safetyModule.maskMedicalPrescriptions(response.content);

    // 6. Save memory
    await this.memory.saveInteraction(sessionId, userMessage, safeOutput);

    // 7. Parse urgency (In a real app, we'd use function calling/structured output)
    let urgency = 'ROUTINE';
    if (safeOutput.toLowerCase().includes('emergency')) urgency = 'EMERGENCY';
    else if (safeOutput.toLowerCase().includes('urgent')) urgency = 'HIGH';

    return {
      content: safeOutput,
      urgency,
      providerData: response
    };
  }
}
