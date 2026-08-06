import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/env';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    permissions: string[];
  };
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ status: 'error', message: 'Invalid or expired token' });
      }
      req.user = user as any;
      next();
    });
  } else {
    res.status(401).json({ status: 'error', message: 'Authorization header missing' });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ status: 'error', message: 'Forbidden: Insufficient role' });
    }
    
    next();
  };
};

export const requirePermission = (permission: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    
    if (!req.user.permissions?.includes(permission)) {
      return res.status(403).json({ status: 'error', message: `Forbidden: Missing permission ${permission}` });
    }
    
    next();
  };
};
