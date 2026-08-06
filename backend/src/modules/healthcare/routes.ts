import { Router } from 'express';
import { SpecialistController } from './controllers/SpecialistController';
import { AppointmentController } from './controllers/AppointmentController';
import { authenticateJWT, requireRole } from '../../core/middlewares/auth';

const router = Router();

// Public specialist routes
router.get('/specialists', SpecialistController.search);
router.get('/specialists/:id', SpecialistController.getById);
router.get('/specialists/:id/slots', SpecialistController.getAvailableSlots);

// Protected appointment routes
router.post('/appointments', authenticateJWT, requireRole(['CUSTOMER']), AppointmentController.create);
router.get('/appointments', authenticateJWT, AppointmentController.getMyAppointments);
router.get('/appointments/all', authenticateJWT, requireRole(['ADMIN', 'OPERATOR']), AppointmentController.getAllAppointments);
router.get('/appointments/:id', authenticateJWT, AppointmentController.getById);
router.patch('/appointments/:id/status', authenticateJWT, requireRole(['PARTNER', 'ADMIN', 'OPERATOR']), AppointmentController.updateStatus);

export default router;
