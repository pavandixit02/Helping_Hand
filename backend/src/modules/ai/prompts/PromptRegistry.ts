export class PromptRegistry {
  private static templates: Record<string, { version: string; template: string }> = {
    'triage_v1': {
      version: '1.0.0',
      template: 'Patient Symptoms: {{symptoms}}. History: {{history}}. Output specialist recommendation.'
    }
  };

  public static getPrompt(id: string, variables: Record<string, string>): string {
    const promptDef = this.templates[id];
    if (!promptDef) throw new Error(`Prompt ${id} not found in registry.`);

    let finalPrompt = promptDef.template;
    for (const [key, value] of Object.entries(variables)) {
      finalPrompt = finalPrompt.replace(`{{${key}}}`, value);
    }
    return finalPrompt;
  }
}
