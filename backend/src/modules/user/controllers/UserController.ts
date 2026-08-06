import { Response } from 'express';
import { AuthRequest } from '../../../core/middlewares/auth';
import { store } from '../../../infrastructure/store';

export class UserController {
  static async getAllUsers(req: AuthRequest, res: Response) {
    try {
      const { role, status, search, page = '1', limit = '20' } = req.query;
      let users = store.users.map(u => ({
        id: u.id, email: u.email, role: u.roleName,
        isEmailVerified: u.isEmailVerified, status: u.status, createdAt: u.createdAt,
      }));

      if (role) users = users.filter(u => u.role === role);
      if (status) users = users.filter(u => u.status === status);
      if (search) {
        const q = (search as string).toLowerCase();
        users = users.filter(u => u.email.toLowerCase().includes(q));
      }

      const p = Number(page); const l = Number(limit);
      const total = users.length;
      const paginated = users.slice((p - 1) * l, p * l);

      res.json({ status: 'success', data: { users: paginated, total, page: p, limit: l } });
    } catch (e: any) {
      res.status(500).json({ status: 'error', message: e.message });
    }
  }

  static async getUserById(req: AuthRequest, res: Response) {
    try {
      const user = store.users.find(u => u.id === req.params.id);
      if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

      let profile: any = null;
      if (user.roleName === 'CUSTOMER') profile = store.customerProfiles.find(p => p.userId === user.id);
      else if (user.roleName === 'PARTNER') profile = store.partnerProfiles.find(p => p.userId === user.id);
      else if (user.roleName === 'OPERATOR') profile = store.operatorProfiles.find(p => p.userId === user.id);

      res.json({
        status: 'success', data: {
          id: user.id, email: user.email, role: user.roleName,
          isEmailVerified: user.isEmailVerified, status: user.status,
          createdAt: user.createdAt, profile,
        },
      });
    } catch (e: any) {
      res.status(500).json({ status: 'error', message: e.message });
    }
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const role = req.user?.role;
      if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

      if (role === 'CUSTOMER') {
        const profile = store.customerProfiles.find(p => p.userId === userId);
        if (profile) {
          Object.assign(profile, { ...req.body, updatedAt: new Date() });
          return res.json({ status: 'success', data: profile });
        }
      } else if (role === 'PARTNER') {
        const profile = store.partnerProfiles.find(p => p.userId === userId);
        if (profile) {
          Object.assign(profile, { ...req.body, updatedAt: new Date() });
          return res.json({ status: 'success', data: profile });
        }
      }

      res.status(404).json({ status: 'error', message: 'Profile not found' });
    } catch (e: any) {
      res.status(500).json({ status: 'error', message: e.message });
    }
  }

  static async getNotifications(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

      const notifications = store.notifications
        .filter(n => n.userId === userId)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      res.json({ status: 'success', data: notifications });
    } catch (e: any) {
      res.status(500).json({ status: 'error', message: e.message });
    }
  }

  static async markNotificationRead(req: AuthRequest, res: Response) {
    try {
      const notification = store.notifications.find(n => n.id === req.params.id);
      if (notification) notification.isRead = true;
      res.json({ status: 'success', data: { message: 'Marked as read' } });
    } catch (e: any) {
      res.status(500).json({ status: 'error', message: e.message });
    }
  }

  static async getDashboardStats(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const role = req.user?.role;
      if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

      if (role === 'ADMIN') {
        res.json({
          status: 'success', data: {
            totalUsers: store.users.length,
            totalPartners: store.partnerProfiles.length,
            totalCustomers: store.customerProfiles.length,
            totalAppointments: store.appointments.length,
            pendingKYC: store.partnerProfiles.filter(p => p.verificationStatus === 'PENDING').length,
            revenue: store.appointments.filter(a => a.status === 'COMPLETED').length * 1500,
          },
        });
      } else if (role === 'PARTNER') {
        const pp = store.partnerProfiles.find(p => p.userId === userId);
        if (!pp) return res.status(404).json({ status: 'error', message: 'Profile not found' });
        const myApts = store.appointments.filter(a => a.partnerId === pp.id);
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);

        res.json({
          status: 'success', data: {
            todayAppointments: myApts.filter(a => a.scheduledAt >= today && a.scheduledAt <= todayEnd).length,
            pendingRequests: myApts.filter(a => a.status === 'PENDING').length,
            totalCompleted: myApts.filter(a => a.status === 'COMPLETED').length,
            totalEarnings: myApts.filter(a => a.status === 'COMPLETED').length * 1350, // after commission
            rating: pp.averageRating,
            totalReviews: pp.totalReviews,
          },
        });
      } else if (role === 'CUSTOMER') {
        const cp = store.customerProfiles.find(p => p.userId === userId);
        if (!cp) return res.status(404).json({ status: 'error', message: 'Profile not found' });
        const myApts = store.appointments.filter(a => a.customerId === cp.id);

        res.json({
          status: 'success', data: {
            upcomingAppointments: myApts.filter(a => ['PENDING', 'CONFIRMED'].includes(a.status) && a.scheduledAt > new Date()).length,
            completedAppointments: myApts.filter(a => a.status === 'COMPLETED').length,
            totalAppointments: myApts.length,
          },
        });
      } else if (role === 'OPERATOR') {
        res.json({
          status: 'success', data: {
            totalUsers: store.users.length,
            pendingKYC: store.partnerProfiles.filter(p => p.verificationStatus === 'PENDING').length,
            activeAppointments: store.appointments.filter(a => ['PENDING', 'CONFIRMED'].includes(a.status)).length,
            totalAppointments: store.appointments.length,
          },
        });
      }
    } catch (e: any) {
      res.status(500).json({ status: 'error', message: e.message });
    }
  }
}
