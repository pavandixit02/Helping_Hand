import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate = (schema: ZodSchema) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          message: error.errors[0]?.message || 'Validation failed',
          errors: error.errors,
        });
      }
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };
