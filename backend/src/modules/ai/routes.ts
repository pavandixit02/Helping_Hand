import { Router } from 'express';
import { AIController } from './ai.controller';
import { authenticateJWT, requireRole } from '../../core/middlewares/auth';

const router = Router();
const controller = new AIController();

// Both customers and operators can use the triage assistant
router.post('/triage', authenticateJWT, controller.triage);

// Customers matching with specialists
router.post('/match', authenticateJWT, controller.matchSpecialist);

export default router;
