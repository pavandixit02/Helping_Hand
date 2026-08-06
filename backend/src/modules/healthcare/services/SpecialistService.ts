import { v4 as uuid } from 'uuid';
import { store } from '../../../infrastructure/store';

export class SpecialistService {
  static async search(filters: {
    specialty?: string; city?: string; minRating?: number;
    search?: string; page?: number; limit?: number;
  }) {
    let results = store.partnerProfiles.filter(p => p.verificationStatus === 'VERIFIED');

    if (filters.specialty) {
      results = results.filter(p => p.specialty.toLowerCase().includes(filters.specialty!.toLowerCase()));
    }
    if (filters.city) {
      results = results.filter(p => p.location?.city?.toLowerCase().includes(filters.city!.toLowerCase()));
    }
    if (filters.minRating) {
      results = results.filter(p => p.averageRating >= filters.minRating!);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(p =>
        p.firstName.toLowerCase().includes(q) || p.lastName.toLowerCase().includes(q) ||
        p.specialty.toLowerCase().includes(q) || (p.bio?.toLowerCase().includes(q))
      );
    }

    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const total = results.length;
    const paginated = results.slice((page - 1) * limit, page * limit);

    // Enrich with services
    const enriched = paginated.map(p => ({
      ...p,
      services: store.services.filter(s => s.partnerId === p.id && s.isActive),
      reviews: store.reviews.filter(r => {
        const apt = store.appointments.find(a => a.id === r.appointmentId);
        return apt && apt.partnerId === p.id;
      }),
    }));

    return { specialists: enriched, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  static async getById(id: string) {
    const partner = store.partnerProfiles.find(p => p.id === id);
    if (!partner) throw new Error('Specialist not found');

    const services = store.services.filter(s => s.partnerId === id && s.isActive);
    const workingHours = store.workingHours.filter(w => w.partnerId === id);
    const appointments = store.appointments.filter(a => a.partnerId === id);
    const reviews = store.reviews.filter(r => {
      const apt = appointments.find(a => a.id === r.appointmentId);
      return !!apt;
    });

    return { ...partner, services, workingHours, reviews };
  }

  static async getAvailableSlots(partnerId: string, date: string) {
    const partner = store.partnerProfiles.find(p => p.id === partnerId);
    if (!partner) throw new Error('Specialist not found');

    const targetDate = new Date(date);
    const dayOfWeek = targetDate.getDay();
    const hours = store.workingHours.find(w => w.partnerId === partnerId && w.dayOfWeek === dayOfWeek);

    if (!hours) return { slots: [], message: 'Specialist not available on this day' };

    // Generate 30-minute slots
    const slots: { time: string; available: boolean }[] = [];
    const [startH, startM] = hours.startTime.split(':').map(Number);
    const [endH, endM] = hours.endTime.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    for (let m = startMinutes; m < endMinutes; m += 30) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      const timeStr = `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      
      // Check if slot is already booked
      const slotDate = new Date(targetDate);
      slotDate.setHours(h, min, 0, 0);
      
      const isBooked = store.appointments.some(
        a => a.partnerId === partnerId &&
        a.scheduledAt.toDateString() === slotDate.toDateString() &&
        a.scheduledAt.getHours() === h && a.scheduledAt.getMinutes() === min &&
        ['PENDING', 'CONFIRMED'].includes(a.status)
      );

      slots.push({ time: timeStr, available: !isBooked });
    }

    return { slots, date, partnerId };
  }
}
