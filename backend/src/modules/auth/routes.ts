import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { authenticateJWT } from '../../core/middlewares/auth';
import { validate } from '../../core/middlewares/validate';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, refreshTokenSchema } from './validators/auth.validators';

const router = Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh-token', validate(refreshTokenSchema), AuthController.refreshToken);
router.post('/forgot-password', validate(forgotPasswordSchema), AuthController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), AuthController.resetPassword);
router.post('/verify-email', authenticateJWT, AuthController.verifyEmail);
router.get('/me', authenticateJWT, AuthController.getMe);

export default router;
