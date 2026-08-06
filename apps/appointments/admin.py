"""Admin configuration for appointments models."""

from django.contrib import admin

from .models import Appointment, BlockedSlot, Leave, RecurringSchedule, Service, WorkingHours


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("name", "partner", "price", "duration_minutes", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name",)


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("customer", "partner", "service", "scheduled_at", "status")
    list_filter = ("status", "scheduled_at")
    search_fields = ("customer__first_name", "partner__first_name")
    date_hierarchy = "scheduled_at"


@admin.register(WorkingHours)
class WorkingHoursAdmin(admin.ModelAdmin):
    list_display = ("partner", "day_of_week", "start_time", "end_time")
    list_filter = ("day_of_week",)


@admin.register(BlockedSlot)
class BlockedSlotAdmin(admin.ModelAdmin):
    list_display = ("partner", "start_time", "end_time", "reason")


@admin.register(Leave)
class LeaveAdmin(admin.ModelAdmin):
    list_display = ("partner", "start_date", "end_date", "status")
    list_filter = ("status",)


@admin.register(RecurringSchedule)
class RecurringScheduleAdmin(admin.ModelAdmin):
    list_display = ("partner", "cron_string")
