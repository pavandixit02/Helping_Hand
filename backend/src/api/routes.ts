import { Router } from 'express';
import authRoutes from '../modules/auth/routes';
import healthcareRoutes from '../modules/healthcare/routes';
import financeRoutes from '../modules/finance/routes';
import communicationRoutes from '../modules/communication/routes';
import partnerRoutes from '../modules/partner/routes';
import userRoutes from '../modules/user/routes';
import aiRoutes from '../modules/ai/routes';

const router = Router();

// Mount Domain Modules
router.use('/auth', authRoutes);
router.use('/healthcare', healthcareRoutes);
router.use('/finance', financeRoutes);
router.use('/communication', communicationRoutes);
router.use('/partner', partnerRoutes);
router.use('/users', userRoutes);
router.use('/ai', aiRoutes);

export default router;
