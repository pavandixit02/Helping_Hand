import { prisma } from '../../infrastructure/prisma';

export class CrmService {
  async createSupportTicket(userId: string, subject: string, description: string, priority: string = 'MEDIUM') {
    return await prisma.supportTicket.create({
      data: { userId, subject, description, priority }
    });
  }

  async getTickets(status?: string) {
    const where = status ? { status } : {};
    return await prisma.supportTicket.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async assignTicket(ticketId: string, operatorId: string) {
    return await prisma.supportTicket.update({
      where: { id: ticketId },
      data: { operatorId, status: 'IN_PROGRESS' }
    });
  }

  async resolveTicket(ticketId: string) {
    return await prisma.supportTicket.update({
      where: { id: ticketId },
      data: { status: 'RESOLVED' }
    });
  }

  async addCustomerNote(userId: string, authorId: string, note: string) {
    return await prisma.customerNote.create({
      data: { userId, authorId, note }
    });
  }

  async getCustomerNotes(userId: string) {
    return await prisma.customerNote.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }
}
