import { Request, Response, NextFunction } from 'express';

// Simple in-memory velocity tracker for demonstration. In production, use Redis.
const requestCounts = new Map<string, { count: number, resetTime: number }>();

export const FraudDetector = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10; // Max 10 financial transactions per minute

  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  if (record.count >= maxRequests) {
    console.warn(`[Fraud Detector] Blocked rapid transactions from IP: ${ip}`);
    return res.status(429).json({ status: 'error', message: 'Fraud threshold exceeded. Too many payment attempts.' });
  }

  record.count += 1;
  next();
};
