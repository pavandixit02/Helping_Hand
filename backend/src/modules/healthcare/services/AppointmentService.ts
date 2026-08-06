import { v4 as uuid } from 'uuid';
import { store } from '../../../infrastructure/store';

export class AppointmentService {
  static async create(data: { customerId: string; partnerId: string; serviceId: string; scheduledAt: string }) {
    // Validate partner exists
    const partner = store.partnerProfiles.find(p => p.id === data.partnerId);
    if (!partner) throw new Error('Specialist not found');

    // Validate service exists
    const service = store.services.find(s => s.id === data.serviceId && s.partnerId === data.partnerId);
    if (!service) throw new Error('Service not found');

    // Validate customer exists
    const customer = store.customerProfiles.find(c => c.id === data.customerId);
    if (!customer) throw new Error('Customer profile not found');

    // Check slot availability
    const scheduledAt = new Date(data.scheduledAt);
    const isBooked = store.appointments.some(
      a => a.partnerId === data.partnerId &&
      a.scheduledAt.getTime() === scheduledAt.getTime() &&
      ['PENDING', 'CONFIRMED'].includes(a.status)
    );
    if (isBooked) throw new Error('This time slot is already booked');

    const appointment = {
      id: uuid(), customerId: data.customerId, partnerId: data.partnerId,
      serviceId: data.serviceId, scheduledAt, status: 'PENDING' as const,
      meetingLink: null, notes: null, createdAt: new Date(), updatedAt: new Date(),
    };
    store.appointments.push(appointment);

    // Create notification for partner
    const user = store.users.find(u => u.id === partner.userId);
    if (user) {
      store.notifications.push({
        id: uuid(), userId: user.id,
        title: 'New Appointment Request',
        body: `${customer.firstName} ${customer.lastName} has requested an appointment for ${service.name}.`,
        type: 'BOOKING', isRead: false, createdAt: new Date(),
      });
    }

    return { ...appointment, service, partner: { firstName: partner.firstName, lastName: partner.lastName, specialty: partner.specialty } };
  }

  static async getByCustomer(customerId: string) {
    const appointments = store.appointments
      .filter(a => a.customerId === customerId)
      .sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime());

    return appointments.map(a => {
      const partner = store.partnerProfiles.find(p => p.id === a.partnerId);
      const service = store.services.find(s => s.id === a.serviceId);
      return { ...a, partner, service };
    });
  }

  static async getByPartner(partnerId: string) {
    const appointments = store.appointments
      .filter(a => a.partnerId === partnerId)
      .sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime());

    return appointments.map(a => {
      const customer = store.customerProfiles.find(c => c.id === a.customerId);
      const service = store.services.find(s => s.id === a.serviceId);
      return { ...a, customer, service };
    });
  }

  static async getById(id: string) {
    const appointment = store.appointments.find(a => a.id === id);
    if (!appointment) throw new Error('Appointment not found');

    const partner = store.partnerProfiles.find(p => p.id === appointment.partnerId);
    const customer = store.customerProfiles.find(c => c.id === appointment.customerId);
    const service = store.services.find(s => s.id === appointment.serviceId);
    const review = store.reviews.find(r => r.appointmentId === id);

    return { ...appointment, partner, customer, service, review };
  }

  static async updateStatus(id: string, status: string, userId: string) {
    const appointment = store.appointments.find(a => a.id === id);
    if (!appointment) throw new Error('Appointment not found');

    appointment.status = status as any;
    appointment.updatedAt = new Date();

    // Notify the other party
    const partner = store.partnerProfiles.find(p => p.id === appointment.partnerId);
    const customer = store.customerProfiles.find(c => c.id === appointment.customerId);

    if (status === 'CONFIRMED' && customer) {
      const customerUser = store.users.find(u => store.customerProfiles.find(cp => cp.userId === u.id && cp.id === appointment.customerId));
      if (customerUser) {
        store.notifications.push({
          id: uuid(), userId: customerUser.id,
          title: 'Appointment Confirmed',
          body: `Your appointment with ${partner?.firstName} ${partner?.lastName} has been confirmed.`,
          type: 'BOOKING', isRead: false, createdAt: new Date(),
        });
      }
    }

    return appointment;
  }

  static async getAllAppointments(filters?: { status?: string; page?: number; limit?: number }) {
    let results = [...store.appointments].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    if (filters?.status) {
      results = results.filter(a => a.status === filters.status);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const total = results.length;
    const paginated = results.slice((page - 1) * limit, page * limit);

    const enriched = paginated.map(a => {
      const partner = store.partnerProfiles.find(p => p.id === a.partnerId);
      const customer = store.customerProfiles.find(c => c.id === a.customerId);
      const service = store.services.find(s => s.id === a.serviceId);
      return { ...a, partner, customer, service };
    });

    return { appointments: enriched, total, page, limit };
  }
}
