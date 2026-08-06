"""
Multi-channel notification dispatcher.
"""

import logging

from django.conf import settings
from django.core.mail import send_mail

logger = logging.getLogger(__name__)


def send_email_notification(to_email: str, subject: str, body: str):
    """Send an email notification."""
    send_mail(
        subject=subject,
        message=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[to_email],
        fail_silently=False,
    )
    logger.info(f"Email sent to {to_email}: {subject}")


def send_push_notification(user_id: str, title: str, body: str):
    """Send a push notification via FCM/APNS."""
    # TODO: Integrate with Firebase Admin SDK.
    logger.info(f"Push notification for {user_id}: {title}")


def send_sms_notification(phone_number: str, message: str):
    """Send an SMS notification via Twilio."""
    # TODO: Integrate with Twilio Python SDK.
    logger.info(f"SMS sent to {phone_number}: {message}")


def send_in_app_notification(user_id: str, title: str, body: str, notification_type: str):
    """Create an in-app notification and broadcast via Django Channels."""
    from apps.communication.models import Notification

    Notification.objects.create(
        user_id=user_id,
        title=title,
        body=body,
        type=notification_type,
    )
    # TODO: Broadcast via Django Channels WebSocket.
    logger.info(f"In-app notification for {user_id}: {title}")
