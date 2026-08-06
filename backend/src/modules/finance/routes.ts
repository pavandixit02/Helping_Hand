import { Router } from 'express';

const router = Router();

router.get('/wallet', (req, res) => res.json({ message: 'Wallet balance endpoint' }));
router.post('/payment', (req, res) => res.json({ message: 'Initiate payment endpoint' }));

export default router;
