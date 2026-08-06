import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { config } from '../../../config/env';
import { store, UserRecord } from '../../../infrastructure/store';

const SALT_ROUNDS = 12;
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const REMEMBER_ME_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export class AuthService {
  static async register(data: {
    email: string; password: string; role: string;
    firstName: string; lastName: string;
    specialty?: string; licenseNumber?: string;
  }) {
    const existing = store.users.find(u => u.email === data.email);
    if (existing) throw new Error('Email already registered');

    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
    const userId = uuid();
    const roleId = uuid();

    const user: UserRecord = {
      id: userId, email: data.email, passwordHash,
      roleId, roleName: data.role,
      isEmailVerified: false, status: 'ACTIVE',
      failedAttempts: 0, lockedUntil: null,
      createdAt: new Date(), updatedAt: new Date(),
    };
    store.users.push(user);

    // Create profile based on role
    if (data.role === 'CUSTOMER') {
      store.customerProfiles.push({
        id: uuid(), userId, firstName: data.firstName, lastName: data.lastName,
        phone: null, address: null, createdAt: new Date(), updatedAt: new Date(),
      });
    } else if (data.role === 'PARTNER') {
      store.partnerProfiles.push({
        id: uuid(), userId, firstName: data.firstName, lastName: data.lastName,
        specialty: data.specialty || 'General', licenseNumber: data.licenseNumber || '',
        verificationStatus: 'PENDING', bio: null, averageRating: 0, totalReviews: 0,
        location: null, createdAt: new Date(), updatedAt: new Date(),
      });
    }

    // Generate email verification OTP
    const otp = this.generateOTP();
    store.otps.push({
      id: uuid(), userId, code: otp, type: 'EMAIL_VERIFICATION',
      isUsed: false, expiresAt: new Date(Date.now() + 10 * 60 * 1000), createdAt: new Date(),
    });

    const tokens = this.generateTokens(user);
    return { user: this.sanitizeUser(user), ...tokens, verificationOTP: otp };
  }

  static async login(email: string, password: string, rememberMe: boolean = false) {
    const user = store.users.find(u => u.email === email);
    if (!user) throw new Error('Invalid credentials');

    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const remaining = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
      throw new Error(`Account locked. Try again in ${remaining} minutes.`);
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      user.failedAttempts += 1;
      if (user.failedAttempts >= MAX_FAILED_ATTEMPTS) {
        user.lockedUntil = new Date(Date.now() + LOCK_DURATION_MS);
        user.failedAttempts = 0;
        throw new Error('Account locked due to too many failed attempts. Try again in 15 minutes.');
      }
      throw new Error('Invalid credentials');
    }

    // Reset failed attempts on success
    user.failedAttempts = 0;
    user.lockedUntil = null;

    const tokens = this.generateTokens(user, rememberMe);
    return { user: this.sanitizeUser(user), ...tokens };
  }

  static async logout(refreshToken: string) {
    const token = store.refreshTokens.find(t => t.token === refreshToken);
    if (token) token.isRevoked = true;
    return { message: 'Logged out successfully' };
  }

  static async refreshToken(token: string) {
    const record = store.refreshTokens.find(t => t.token === token && !t.isRevoked);
    if (!record || record.expiresAt < new Date()) {
      throw new Error('Invalid or expired refresh token');
    }

    const user = store.users.find(u => u.id === record.userId);
    if (!user) throw new Error('User not found');

    // Revoke old token
    record.isRevoked = true;

    const tokens = this.generateTokens(user);
    return { user: this.sanitizeUser(user), ...tokens };
  }

  static async forgotPassword(email: string) {
    const user = store.users.find(u => u.email === email);
    if (!user) return { message: 'If the email exists, a reset code has been sent.' };

    const otp = this.generateOTP();
    store.otps.push({
      id: uuid(), userId: user.id, code: otp, type: 'PASSWORD_RESET',
      isUsed: false, expiresAt: new Date(Date.now() + 10 * 60 * 1000), createdAt: new Date(),
    });

    // In production: send email with OTP
    console.log(`[Auth] Password reset OTP for ${email}: ${otp}`);
    return { message: 'If the email exists, a reset code has been sent.', otp }; // otp exposed for dev only
  }

  static async resetPassword(email: string, otp: string, newPassword: string) {
    const user = store.users.find(u => u.email === email);
    if (!user) throw new Error('Invalid request');

    const otpRecord = store.otps.find(
      o => o.userId === user.id && o.code === otp && o.type === 'PASSWORD_RESET' && !o.isUsed && o.expiresAt > new Date()
    );
    if (!otpRecord) throw new Error('Invalid or expired OTP');

    otpRecord.isUsed = true;
    user.passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    user.updatedAt = new Date();

    return { message: 'Password reset successfully' };
  }

  static async verifyEmail(userId: string, otp: string) {
    const otpRecord = store.otps.find(
      o => o.userId === userId && o.code === otp && o.type === 'EMAIL_VERIFICATION' && !o.isUsed && o.expiresAt > new Date()
    );
    if (!otpRecord) throw new Error('Invalid or expired OTP');

    otpRecord.isUsed = true;
    const user = store.users.find(u => u.id === userId);
    if (user) {
      user.isEmailVerified = true;
      user.updatedAt = new Date();
    }

    return { message: 'Email verified successfully' };
  }

  static async getMe(userId: string) {
    const user = store.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    let profile: any = null;
    if (user.roleName === 'CUSTOMER') {
      profile = store.customerProfiles.find(p => p.userId === userId);
    } else if (user.roleName === 'PARTNER') {
      profile = store.partnerProfiles.find(p => p.userId === userId);
    } else if (user.roleName === 'OPERATOR') {
      profile = store.operatorProfiles.find(p => p.userId === userId);
    }

    return { ...this.sanitizeUser(user), profile };
  }

  private static generateTokens(user: UserRecord, rememberMe: boolean = false) {
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.roleName, permissions: [] },
      config.JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    const refreshTokenValue = uuid() + '-' + uuid();
    const expiresAt = new Date(Date.now() + (rememberMe ? REMEMBER_ME_EXPIRY_MS : REFRESH_TOKEN_EXPIRY_MS));

    store.refreshTokens.push({
      id: uuid(), userId: user.id, token: refreshTokenValue,
      isRevoked: false, expiresAt, createdAt: new Date(),
    });

    return { accessToken, refreshToken: refreshTokenValue };
  }

  private static generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private static sanitizeUser(user: UserRecord) {
    return {
      id: user.id, email: user.email, role: user.roleName,
      isEmailVerified: user.isEmailVerified, status: user.status,
      createdAt: user.createdAt,
    };
  }
}
