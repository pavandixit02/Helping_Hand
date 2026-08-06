import { Router } from 'express';

const router = Router();

router.get('/availability', (req, res) => res.json({ message: 'Get partner availability endpoint' }));
router.post('/kyc', (req, res) => res.json({ message: 'Upload KYC endpoint' }));

export default router;
