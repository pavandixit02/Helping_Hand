import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { authenticateJWT, requireRole } from '../../core/middlewares/auth';

const router = Router();

// Protected user routes
router.get('/dashboard', authenticateJWT, UserController.getDashboardStats);
router.get('/notifications', authenticateJWT, UserController.getNotifications);
router.patch('/notifications/:id/read', authenticateJWT, UserController.markNotificationRead);
router.patch('/profile', authenticateJWT, UserController.updateProfile);

// Admin-only user management
router.get('/', authenticateJWT, requireRole(['ADMIN', 'OPERATOR']), UserController.getAllUsers);
router.get('/:id', authenticateJWT, requireRole(['ADMIN', 'OPERATOR']), UserController.getUserById);

export default router;
