"""Admin for CRM models."""

from django.contrib import admin
from .models import SupportTicket, CustomerNote


@admin.register(SupportTicket)
class SupportTicketAdmin(admin.ModelAdmin):
    list_display = ("subject", "status", "priority", "user_id", "operator_id", "created_at")
    list_filter = ("status", "priority")


@admin.register(CustomerNote)
class CustomerNoteAdmin(admin.ModelAdmin):
    list_display = ("user_id", "author_id", "created_at")
