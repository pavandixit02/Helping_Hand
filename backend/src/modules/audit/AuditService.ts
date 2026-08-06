import { prisma } from '../../infrastructure/prisma';

export class AuditService {
  async logAction(action: string, resource: string, resourceId?: string, userId?: string, details?: any, ipAddress?: string) {
    try {
      await prisma.auditLog.create({
        data: {
          action,
          resource,
          resourceId,
          userId,
          details: details || {},
          ipAddress
        }
      });
    } catch (e) {
      console.error('[AuditService] Failed to log action', e);
    }
  }

  async getLogs(limit: number = 100) {
    return await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  }
}
