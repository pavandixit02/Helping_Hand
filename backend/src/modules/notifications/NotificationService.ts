import { prisma } from '../../infrastructure/prisma';

export interface NotificationPayload {
  userId: string;
  title: string;
  body: string;
  type: string;
  channels: ('IN_APP' | 'EMAIL' | 'PUSH' | 'SMS' | 'WHATSAPP')[];
}

export class NotificationService {
  async sendNotification(payload: NotificationPayload) {
    const { userId, title, body, type, channels } = payload;
    
    // 1. Get user preferences
    const preferences = await prisma.notificationPreference.findUnique({
      where: { userId }
    });

    // 2. Route to IN_APP (Always save to DB if requested)
    if (channels.includes('IN_APP')) {
      await prisma.notification.create({
        data: { userId, title, body, type }
      });
    }

    // 3. Route to PUSH (FCM)
    if (channels.includes('PUSH') && (preferences?.pushEnabled ?? true)) {
      this.sendPush(userId, title, body);
    }

    // 4. Route to EMAIL
    if (channels.includes('EMAIL') && (preferences?.emailEnabled ?? true)) {
      this.sendEmail(userId, title, body);
    }

    // 5. Route to SMS / WhatsApp
    if (channels.includes('SMS') && (preferences?.smsEnabled ?? false)) {
      this.sendSMS(userId, body);
    }
    if (channels.includes('WHATSAPP')) {
      this.sendWhatsApp(userId, body);
    }
  }

  private async sendPush(userId: string, title: string, body: string) {
    console.log(`[Push Notification] Sending to ${userId}: ${title} - ${body}`);
  }

  private async sendEmail(userId: string, title: string, body: string) {
    console.log(`[Email] Sending to ${userId}: ${title} - ${body}`);
  }

  private async sendSMS(userId: string, body: string) {
    console.log(`[SMS] Sending to ${userId}: ${body}`);
  }

  private async sendWhatsApp(userId: string, body: string) {
    console.log(`[WhatsApp] Sending to ${userId}: ${body}`);
  }
}
