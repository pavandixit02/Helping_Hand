import { prisma } from '../../infrastructure/prisma';

export class WorkflowService {
  async startWorkflow(type: string, referenceId: string, config?: any) {
    return await prisma.approvalWorkflow.create({
      data: { type, referenceId, config: config || {} }
    });
  }

  async getPendingWorkflows(type?: string) {
    const where = type ? { type, status: 'PENDING' } : { status: 'PENDING' };
    return await prisma.approvalWorkflow.findMany({ where, orderBy: { createdAt: 'asc' } });
  }

  async approveWorkflow(id: string) {
    return await prisma.approvalWorkflow.update({
      where: { id },
      data: { status: 'APPROVED' }
    });
  }

  async rejectWorkflow(id: string) {
    return await prisma.approvalWorkflow.update({
      where: { id },
      data: { status: 'REJECTED' }
    });
  }
}
