"""Admin configuration for communication models."""

from django.contrib import admin

from .models import (
    Attachment,
    Conversation,
    Message,
    Notification,
    NotificationPreference,
    PushToken,
    Review,
)


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ("id", "created_at", "updated_at")


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("conversation", "sender_id", "is_read", "created_at")
    list_filter = ("is_read",)


@admin.register(Attachment)
class AttachmentAdmin(admin.ModelAdmin):
    list_display = ("message", "mime_type", "created_at")


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ("title", "type", "user_id", "is_read", "created_at")
    list_filter = ("type", "is_read")


@admin.register(NotificationPreference)
class NotificationPreferenceAdmin(admin.ModelAdmin):
    list_display = ("user_id", "email_enabled", "push_enabled", "sms_enabled")


@admin.register(PushToken)
class PushTokenAdmin(admin.ModelAdmin):
    list_display = ("user_id", "provider", "created_at")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("appointment", "rating", "is_approved", "created_at")
    list_filter = ("is_approved", "rating")
