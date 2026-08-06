import { Request, Response } from 'express';
import { AITriageAssistant } from './services/AITriageAssistant';
import { SpecialistMatcher } from './services/SpecialistMatcher';

export class AIController {
  private triageAssistant = new AITriageAssistant();
  private specialistMatcher = new SpecialistMatcher();

  triage = async (req: Request, res: Response) => {
    try {
      const { sessionId, message, context } = req.body;
      const result = await this.triageAssistant.processTriage(sessionId, message, context || {});
      res.json({ status: 'success', data: result });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Triage failed' });
    }
  };

  matchSpecialist = async (req: Request, res: Response) => {
    try {
      const { symptoms } = req.body;
      const specialists = await this.specialistMatcher.recommendSpecialists(symptoms);
      res.json({ status: 'success', data: specialists });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Specialist matching failed' });
    }
  };
}
