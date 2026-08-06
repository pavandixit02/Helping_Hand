export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string; // Contains variables like {{patientName}}
  defaultProvider: string;
  defaultModel: string;
}

export class PromptRegistry {
  // In-memory mock for now. In production, this would read from the DB.
  private templates: Map<string, PromptTemplate> = new Map();

  constructor() {
    this.seedDefaults();
  }

  private seedDefaults() {
    this.templates.set('TRIAGE_ASSISTANT', {
      id: 'TRIAGE_ASSISTANT',
      name: 'Triage Assistant',
      description: 'System prompt for the AI Triage Assistant',
      template: `You are an expert Medical Triage Assistant for the Helping Hand platform.
      
CRITICAL RULES:
1. NEVER diagnose a disease.
2. NEVER prescribe medication.
3. ALWAYS state that you are an AI assistant, not a doctor.
4. Your goal is to collect symptoms, determine urgency (LOW, MEDIUM, HIGH, EMERGENCY), and recommend the appropriate specialist department.

Patient Context:
Age: {{age}}
Gender: {{gender}}
Medical History: {{history}}

Current interaction context: Ask clarifying questions about their symptoms. If the symptoms indicate an emergency (e.g., chest pain, severe bleeding), immediately recommend visiting an emergency room or calling emergency services.`,
      defaultProvider: 'OPENAI',
      defaultModel: 'gpt-4o',
    });

    this.templates.set('SPECIALIST_MATCHER', {
      id: 'SPECIALIST_MATCHER',
      name: 'Specialist Matcher',
      description: 'Analyzes symptoms to recommend specialist keywords',
      template: `Analyze the following patient symptoms and output ONLY a JSON array of the top 3 recommended medical specialties (e.g. ["Cardiologist", "Pulmonologist"]).
      
Symptoms: {{symptoms}}`,
      defaultProvider: 'GEMINI',
      defaultModel: 'gemini-2.5-pro',
    });
  }

  getTemplate(id: string): PromptTemplate {
    const template = this.templates.get(id);
    if (!template) throw new Error(`Prompt template ${id} not found.`);
    return template;
  }

  render(id: string, variables: Record<string, string>): string {
    const template = this.getTemplate(id);
    let rendered = template.template;
    for (const [key, value] of Object.entries(variables)) {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return rendered;
  }

  // Admin capabilities to update prompts would go here...
  async saveTemplate(template: PromptTemplate): Promise<void> {
    this.templates.set(template.id, template);
    // TODO: Save to PostgreSQL
  }
}
