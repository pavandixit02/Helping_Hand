// In-memory data store that mirrors Prisma schema shapes.
// Allows the full app to run without PostgreSQL.
// When DB is connected, swap to prisma calls in services.

import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  roleId: string;
  roleName: string;
  isEmailVerified: boolean;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING' | 'BANNED';
  failedAttempts: number;
  lockedUntil: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RefreshTokenRecord {
  id: string;
  userId: string;
  token: string;
  isRevoked: boolean;
  expiresAt: Date;
  createdAt: Date;
}

export interface OTPRecord {
  id: string;
  userId: string;
  code: string;
  type: string;
  isUsed: boolean;
  expiresAt: Date;
  createdAt: Date;
}

export interface CustomerProfileRecord {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  address: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface PartnerProfileRecord {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  specialty: string;
  licenseNumber: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'SUSPENDED';
  bio: string | null;
  averageRating: number;
  totalReviews: number;
  location: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface OperatorProfileRecord {
  id: string;
  userId: string;
  department: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceRecord {
  id: string;
  partnerId: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentRecord {
  id: string;
  customerId: string;
  partnerId: string;
  serviceId: string;
  scheduledAt: Date;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  meetingLink: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewRecord {
  id: string;
  appointmentId: string;
  rating: number;
  comment: string | null;
  isApproved: boolean;
  createdAt: Date;
}

export interface WorkingHoursRecord {
  id: string;
  partnerId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface NotificationRecord {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
}

class InMemoryStore {
  users: UserRecord[] = [];
  refreshTokens: RefreshTokenRecord[] = [];
  otps: OTPRecord[] = [];
  customerProfiles: CustomerProfileRecord[] = [];
  partnerProfiles: PartnerProfileRecord[] = [];
  operatorProfiles: OperatorProfileRecord[] = [];
  services: ServiceRecord[] = [];
  appointments: AppointmentRecord[] = [];
  reviews: ReviewRecord[] = [];
  workingHours: WorkingHoursRecord[] = [];
  notifications: NotificationRecord[] = [];

  constructor() {
    this.seed();
  }

  private async hashPassword(pw: string): Promise<string> {
    return bcrypt.hashSync(pw, 10);
  }

  seed() {
    const adminRoleId = uuid();
    const customerRoleId = uuid();
    const partnerRoleId = uuid();
    const operatorRoleId = uuid();

    // Seed Roles are implicit via roleName on user
    const adminId = uuid();
    const patient1Id = uuid();
    const patient2Id = uuid();
    const partner1Id = uuid();
    const partner2Id = uuid();
    const partner3Id = uuid();
    const operator1Id = uuid();

    const hash = bcrypt.hashSync('Password@123', 10);

    this.users = [
      { id: adminId, email: 'admin@helpinghand.com', passwordHash: hash, roleId: adminRoleId, roleName: 'ADMIN', isEmailVerified: true, status: 'ACTIVE', failedAttempts: 0, lockedUntil: null, createdAt: new Date(), updatedAt: new Date() },
      { id: patient1Id, email: 'patient@helpinghand.com', passwordHash: hash, roleId: customerRoleId, roleName: 'CUSTOMER', isEmailVerified: true, status: 'ACTIVE', failedAttempts: 0, lockedUntil: null, createdAt: new Date(), updatedAt: new Date() },
      { id: patient2Id, email: 'rahul@gmail.com', passwordHash: hash, roleId: customerRoleId, roleName: 'CUSTOMER', isEmailVerified: true, status: 'ACTIVE', failedAttempts: 0, lockedUntil: null, createdAt: new Date(), updatedAt: new Date() },
      { id: partner1Id, email: 'dr.sharma@helpinghand.com', passwordHash: hash, roleId: partnerRoleId, roleName: 'PARTNER', isEmailVerified: true, status: 'ACTIVE', failedAttempts: 0, lockedUntil: null, createdAt: new Date(), updatedAt: new Date() },
      { id: partner2Id, email: 'dr.patel@helpinghand.com', passwordHash: hash, roleId: partnerRoleId, roleName: 'PARTNER', isEmailVerified: true, status: 'ACTIVE', failedAttempts: 0, lockedUntil: null, createdAt: new Date(), updatedAt: new Date() },
      { id: partner3Id, email: 'dr.gupta@helpinghand.com', passwordHash: hash, roleId: partnerRoleId, roleName: 'PARTNER', isEmailVerified: true, status: 'ACTIVE', failedAttempts: 0, lockedUntil: null, createdAt: new Date(), updatedAt: new Date() },
      { id: operator1Id, email: 'operator@helpinghand.com', passwordHash: hash, roleId: operatorRoleId, roleName: 'OPERATOR', isEmailVerified: true, status: 'ACTIVE', failedAttempts: 0, lockedUntil: null, createdAt: new Date(), updatedAt: new Date() },
    ];

    const cp1Id = uuid();
    const cp2Id = uuid();
    this.customerProfiles = [
      { id: cp1Id, userId: patient1Id, firstName: 'Ananya', lastName: 'Singh', phone: '+91-9876543210', address: { city: 'Mumbai', state: 'Maharashtra' }, createdAt: new Date(), updatedAt: new Date() },
      { id: cp2Id, userId: patient2Id, firstName: 'Rahul', lastName: 'Verma', phone: '+91-9988776655', address: { city: 'Delhi', state: 'Delhi' }, createdAt: new Date(), updatedAt: new Date() },
    ];

    this.operatorProfiles = [
      { id: uuid(), userId: operator1Id, department: 'Support', level: 2, createdAt: new Date(), updatedAt: new Date() },
    ];

    const pp1Id = uuid();
    const pp2Id = uuid();
    const pp3Id = uuid();
    this.partnerProfiles = [
      { id: pp1Id, userId: partner1Id, firstName: 'Dr. Arun', lastName: 'Sharma', specialty: 'Cardiology', licenseNumber: 'MCI-12345', verificationStatus: 'VERIFIED', bio: 'Senior Cardiologist with 15 years of experience at AIIMS Delhi. Specializes in interventional cardiology and heart failure management.', averageRating: 4.8, totalReviews: 124, location: { city: 'Delhi', state: 'Delhi', lat: 28.6139, lng: 77.2090 }, createdAt: new Date(), updatedAt: new Date() },
      { id: pp2Id, userId: partner2Id, firstName: 'Dr. Priya', lastName: 'Patel', specialty: 'Dermatology', licenseNumber: 'MCI-67890', verificationStatus: 'VERIFIED', bio: 'Board-certified Dermatologist specializing in cosmetic dermatology, acne treatment, and skin cancer screening. 10+ years experience.', averageRating: 4.9, totalReviews: 89, location: { city: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 }, createdAt: new Date(), updatedAt: new Date() },
      { id: pp3Id, userId: partner3Id, firstName: 'Dr. Vikram', lastName: 'Gupta', specialty: 'Orthopedics', licenseNumber: 'MCI-11223', verificationStatus: 'VERIFIED', bio: 'Orthopedic Surgeon with expertise in joint replacement, sports medicine, and trauma surgery. Former HOD at Fortis Hospital.', averageRating: 4.7, totalReviews: 67, location: { city: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946 }, createdAt: new Date(), updatedAt: new Date() },
    ];

    const s1 = uuid(), s2 = uuid(), s3 = uuid(), s4 = uuid(), s5 = uuid(), s6 = uuid();
    this.services = [
      { id: s1, partnerId: pp1Id, name: 'Cardiac Consultation', description: 'Comprehensive heart health assessment including ECG review and risk evaluation.', price: 1500, durationMinutes: 30, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: s2, partnerId: pp1Id, name: 'ECG Interpretation', description: 'Expert analysis of ECG reports with detailed findings.', price: 800, durationMinutes: 15, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: s3, partnerId: pp2Id, name: 'Skin Consultation', description: 'Complete skin examination and personalized treatment plan.', price: 1200, durationMinutes: 30, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: s4, partnerId: pp2Id, name: 'Acne Treatment Plan', description: 'Customized acne treatment with follow-up schedule.', price: 2000, durationMinutes: 45, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: s5, partnerId: pp3Id, name: 'Orthopedic Consultation', description: 'Joint and bone health assessment with imaging review.', price: 1300, durationMinutes: 30, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: s6, partnerId: pp3Id, name: 'Sports Injury Assessment', description: 'Specialized evaluation for sports-related injuries and rehabilitation planning.', price: 1800, durationMinutes: 45, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    ];

    // Working hours for all partners (Mon-Sat, 9-17)
    for (const pid of [pp1Id, pp2Id, pp3Id]) {
      for (let day = 1; day <= 6; day++) {
        this.workingHours.push({ id: uuid(), partnerId: pid, dayOfWeek: day, startTime: '09:00', endTime: '17:00' });
      }
    }

    // Seed some appointments
    const now = new Date();
    const tomorrow = new Date(now); tomorrow.setDate(now.getDate() + 1); tomorrow.setHours(10, 0, 0, 0);
    const dayAfter = new Date(now); dayAfter.setDate(now.getDate() + 2); dayAfter.setHours(14, 0, 0, 0);
    const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1); yesterday.setHours(11, 0, 0, 0);

    const apt1Id = uuid(), apt2Id = uuid(), apt3Id = uuid();
    this.appointments = [
      { id: apt1Id, customerId: cp1Id, partnerId: pp1Id, serviceId: s1, scheduledAt: tomorrow, status: 'CONFIRMED', meetingLink: null, notes: null, createdAt: new Date(), updatedAt: new Date() },
      { id: apt2Id, customerId: cp1Id, partnerId: pp2Id, serviceId: s3, scheduledAt: dayAfter, status: 'PENDING', meetingLink: null, notes: null, createdAt: new Date(), updatedAt: new Date() },
      { id: apt3Id, customerId: cp2Id, partnerId: pp3Id, serviceId: s5, scheduledAt: yesterday, status: 'COMPLETED', meetingLink: null, notes: 'Follow-up in 2 weeks', createdAt: new Date(), updatedAt: new Date() },
    ];

    this.reviews = [
      { id: uuid(), appointmentId: apt3Id, rating: 5, comment: 'Excellent consultation. Very thorough and professional.', isApproved: true, createdAt: new Date() },
    ];

    this.notifications = [
      { id: uuid(), userId: patient1Id, title: 'Appointment Confirmed', body: 'Your appointment with Dr. Sharma is confirmed for tomorrow at 10:00 AM.', type: 'BOOKING', isRead: false, createdAt: new Date() },
      { id: uuid(), userId: partner1Id, title: 'New Booking', body: 'A new appointment has been booked for tomorrow at 10:00 AM.', type: 'BOOKING', isRead: false, createdAt: new Date() },
    ];
  }
}

export const store = new InMemoryStore();
