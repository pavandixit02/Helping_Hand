export class AISafetyModule {
  
  // Basic list of bad words / injection attempts
  private forbiddenPatterns = [
    /ignore previous instructions/i,
    /you are now a/i,
    /forget all rules/i,
    /jailbreak/i
  ];

  private prescriptionPatterns = [
    /\b(prescribe|take|dosage|mg|mcg|ml)\b/i,
    /\b(antibiotics|ibuprofen|paracetamol|adderall|xanax)\b/i
  ];

  validateInput(text: string): boolean {
    for (const pattern of this.forbiddenPatterns) {
      if (pattern.test(text)) {
        console.warn(`[SAFETY] Potential prompt injection detected: ${text}`);
        return false;
      }
    }
    return true;
  }

  maskMedicalPrescriptions(output: string): string {
    // If the LLM somehow hallucinates a prescription despite system prompts,
    // we catch common drug terminology and override the response.
    let isPrescribing = false;
    
    // Very rudimentary check for safety fallback
    if (output.toLowerCase().includes("i am prescribing") || output.toLowerCase().includes("take the following medication")) {
      isPrescribing = true;
    }

    if (isPrescribing) {
      return "As an AI, I am strictly prohibited from prescribing medication or diagnosing conditions. Please consult a qualified healthcare professional immediately.";
    }

    return output;
  }
}
