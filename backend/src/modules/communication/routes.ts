import { Router } from 'express';

const router = Router();

router.get('/messages', (req, res) => res.json({ message: 'Get messages endpoint' }));
router.post('/notifications/send', (req, res) => res.json({ message: 'Send notification endpoint' }));

export default router;
