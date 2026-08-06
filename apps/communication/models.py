"""
Communication models — Conversations, Messages, Notifications, Push Tokens, Reviews.

Translated from Prisma schema section 7: Communications (Chat & Notifications).
"""

import uuid

from django.db import models


class Conversation(models.Model):
    """A conversation between two or more participants."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    participant_ids = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return f"Conversation {self.id} ({len(self.participant_ids)} participants)"


class Message(models.Model):
    """A message within a conversation. Content is encrypted at rest."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="messages"
    )
    sender_id = models.UUIDField()
    content = models.TextField()  # Encrypted
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]
        indexes = [
            models.Index(fields=["conversation", "created_at"]),
        ]

    def __str__(self):
        return f"Message in {self.conversation_id} at {self.created_at}"


class Attachment(models.Model):
    """File attachment on a message."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    message = models.ForeignKey(
        Message, on_delete=models.CASCADE, related_name="attachments"
    )
    file_url = models.URLField()
    mime_type = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Attachment ({self.mime_type})"


class PushToken(models.Model):
    """Push notification tokens for mobile devices."""

    class Provider(models.TextChoices):
        FCM = "FCM", "Firebase Cloud Messaging"
        APNS = "APNS", "Apple Push Notification Service"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField()
    token = models.CharField(max_length=500, unique=True)
    provider = models.CharField(max_length=10, choices=Provider.choices)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.provider} token for user {self.user_id}"


class Notification(models.Model):
    """In-app notification for a user."""

    class NotificationType(models.TextChoices):
        BOOKING = "BOOKING", "Booking"
        REMINDER = "REMINDER", "Reminder"
        PAYMENT = "PAYMENT", "Payment"
        EMERGENCY = "EMERGENCY", "Emergency"
        SYSTEM = "SYSTEM", "System"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField()
    title = models.CharField(max_length=200)
    body = models.TextField()
    type = models.CharField(max_length=20, choices=NotificationType.choices)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.type}: {self.title}"


class NotificationPreference(models.Model):
    """User notification delivery preferences."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField(unique=True)
    email_enabled = models.BooleanField(default=True)
    push_enabled = models.BooleanField(default=True)
    sms_enabled = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification prefs for user {self.user_id}"


class Review(models.Model):
    """Patient review of an appointment/consultation."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    appointment = models.OneToOneField(
        "appointments.Appointment",
        on_delete=models.CASCADE,
        related_name="review",
    )
    rating = models.IntegerField()
    comment = models.TextField(blank=True)
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Review: {self.rating}/5 for Appointment {self.appointment_id}"
