import { Request, Response } from 'express';
import { SpecialistService } from '../services/SpecialistService';

export class SpecialistController {
  static async search(req: Request, res: Response) {
    try {
      const { specialty, city, minRating, search, page, limit } = req.query;
      const result = await SpecialistService.search({
        specialty: specialty as string, city: city as string,
        minRating: minRating ? Number(minRating) : undefined,
        search: search as string,
        page: page ? Number(page) : 1, limit: limit ? Number(limit) : 10,
      });
      res.json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(500).json({ status: 'error', message: e.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const result = await SpecialistService.getById(req.params.id);
      res.json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(404).json({ status: 'error', message: e.message });
    }
  }

  static async getAvailableSlots(req: Request, res: Response) {
    try {
      const { date } = req.query;
      if (!date) return res.status(400).json({ status: 'error', message: 'Date is required' });
      const result = await SpecialistService.getAvailableSlots(req.params.id, date as string);
      res.json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }
}
