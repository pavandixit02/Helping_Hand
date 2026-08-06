"""Admin for audit models."""

from django.contrib import admin
from .models import AuditLog, SystemConfig


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ("action", "resource", "user_id", "ip_address", "created_at")
    list_filter = ("action", "resource")
    readonly_fields = ("id", "user_id", "action", "resource", "resource_id", "details", "ip_address", "created_at")

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(SystemConfig)
class SystemConfigAdmin(admin.ModelAdmin):
    list_display = ("key", "description", "updated_at", "updated_by")
    search_fields = ("key",)
