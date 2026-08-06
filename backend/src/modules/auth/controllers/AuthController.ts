import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { AuthRequest } from '../../../core/middlewares/auth';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password, rememberMe } = req.body;
      const result = await AuthService.login(email, password, rememberMe);
      res.status(200).json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(401).json({ status: 'error', message: e.message });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const result = await AuthService.logout(refreshToken);
      res.status(200).json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const result = await AuthService.refreshToken(refreshToken);
      res.status(200).json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(401).json({ status: 'error', message: e.message });
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    try {
      const result = await AuthService.forgotPassword(req.body.email);
      res.status(200).json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { email, otp, newPassword } = req.body;
      const result = await AuthService.resetPassword(email, otp, newPassword);
      res.status(200).json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  static async verifyEmail(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
      const result = await AuthService.verifyEmail(userId, req.body.otp);
      res.status(200).json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  static async getMe(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
      const result = await AuthService.getMe(userId);
      res.status(200).json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }
}
