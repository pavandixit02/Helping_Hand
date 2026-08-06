import { Response } from 'express';
import { AuthRequest } from '../../../core/middlewares/auth';
import { AppointmentService } from '../services/AppointmentService';
import { store } from '../../../infrastructure/store';

export class AppointmentController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

      const customerProfile = store.customerProfiles.find(c => c.userId === userId);
      if (!customerProfile) return res.status(400).json({ status: 'error', message: 'Customer profile not found' });

      const result = await AppointmentService.create({
        ...req.body, customerId: customerProfile.id,
      });
      res.status(201).json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  static async getMyAppointments(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const role = req.user?.role;
      if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

      let result;
      if (role === 'CUSTOMER') {
        const cp = store.customerProfiles.find(c => c.userId === userId);
        if (!cp) return res.status(400).json({ status: 'error', message: 'Profile not found' });
        result = await AppointmentService.getByCustomer(cp.id);
      } else if (role === 'PARTNER') {
        const pp = store.partnerProfiles.find(p => p.userId === userId);
        if (!pp) return res.status(400).json({ status: 'error', message: 'Profile not found' });
        result = await AppointmentService.getByPartner(pp.id);
      } else {
        result = await AppointmentService.getAllAppointments(req.query as any);
      }

      res.json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(500).json({ status: 'error', message: e.message });
    }
  }

  static async getById(req: AuthRequest, res: Response) {
    try {
      const result = await AppointmentService.getById(req.params.id);
      res.json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(404).json({ status: 'error', message: e.message });
    }
  }

  static async updateStatus(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
      const result = await AppointmentService.updateStatus(req.params.id, req.body.status, userId);
      res.json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  static async getAllAppointments(req: AuthRequest, res: Response) {
    try {
      const result = await AppointmentService.getAllAppointments(req.query as any);
      res.json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(500).json({ status: 'error', message: e.message });
    }
  }
}
