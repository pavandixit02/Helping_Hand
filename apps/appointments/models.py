"""
Appointments models — Services, Scheduling, Availability, Booking.

Translated from Prisma schema:
  - Section 4: Partner Management (Availability & Scheduling)
  - Section 5: Booking & Appointments
"""

import uuid

from django.db import models


# ============================================================================
# Availability & Scheduling
# ============================================================================


class WorkingHours(models.Model):
    """Weekly working hours for a partner (doctor/specialist)."""

    DAY_CHOICES = [
        (0, "Sunday"),
        (1, "Monday"),
        (2, "Tuesday"),
        (3, "Wednesday"),
        (4, "Thursday"),
        (5, "Friday"),
        (6, "Saturday"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    partner = models.ForeignKey(
        "profiles.PartnerProfile",
        on_delete=models.CASCADE,
        related_name="working_hours",
    )
    day_of_week = models.IntegerField(choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        verbose_name_plural = "Working hours"
        ordering = ["day_of_week", "start_time"]
        unique_together = ("partner", "day_of_week", "start_time")

    def __str__(self):
        return f"{self.partner} — {self.get_day_of_week_display()} {self.start_time}-{self.end_time}"


class BlockedSlot(models.Model):
    """One-off blocked time slots (e.g., personal appointments, emergencies)."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    partner = models.ForeignKey(
        "profiles.PartnerProfile",
        on_delete=models.CASCADE,
        related_name="blocked_slots",
    )
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    reason = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ["start_time"]

    def __str__(self):
        return f"Blocked: {self.partner} ({self.start_time} → {self.end_time})"


class Leave(models.Model):
    """Extended leave periods for partners."""

    class LeaveStatus(models.TextChoices):
        APPROVED = "APPROVED", "Approved"
        PENDING = "PENDING", "Pending"
        REJECTED = "REJECTED", "Rejected"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    partner = models.ForeignKey(
        "profiles.PartnerProfile",
        on_delete=models.CASCADE,
        related_name="leaves",
    )
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(
        max_length=20, choices=LeaveStatus.choices, default=LeaveStatus.PENDING
    )

    class Meta:
        ordering = ["-start_date"]

    def __str__(self):
        return f"Leave: {self.partner} ({self.start_date} → {self.end_date})"


class RecurringSchedule(models.Model):
    """Cron-based recurring schedules for partners."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    partner = models.ForeignKey(
        "profiles.PartnerProfile",
        on_delete=models.CASCADE,
        related_name="recurring_schedules",
    )
    cron_string = models.CharField(max_length=100)
    config = models.JSONField(default=dict)

    def __str__(self):
        return f"Recurring: {self.partner} ({self.cron_string})"


# ============================================================================
# Services & Appointments
# ============================================================================


class Service(models.Model):
    """Healthcare services offered by a partner (consultation, procedure, etc.)."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    partner = models.ForeignKey(
        "profiles.PartnerProfile",
        on_delete=models.CASCADE,
        related_name="services",
    )
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_minutes = models.IntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} — ₹{self.price} ({self.duration_minutes} min)"


class AppointmentStatus(models.TextChoices):
    PENDING = "PENDING", "Pending"
    CONFIRMED = "CONFIRMED", "Confirmed"
    COMPLETED = "COMPLETED", "Completed"
    CANCELLED = "CANCELLED", "Cancelled"
    NO_SHOW = "NO_SHOW", "No Show"


class Appointment(models.Model):
    """A booked appointment between a customer and a partner for a specific service."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(
        "profiles.CustomerProfile",
        on_delete=models.CASCADE,
        related_name="appointments",
    )
    partner = models.ForeignKey(
        "profiles.PartnerProfile",
        on_delete=models.CASCADE,
        related_name="appointments",
    )
    service = models.ForeignKey(
        Service, on_delete=models.CASCADE, related_name="appointments"
    )
    scheduled_at = models.DateTimeField()
    status = models.CharField(
        max_length=20,
        choices=AppointmentStatus.choices,
        default=AppointmentStatus.PENDING,
    )
    meeting_link = models.URLField(blank=True)
    notes = models.TextField(blank=True)  # Encrypted in production
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-scheduled_at"]
        indexes = [
            models.Index(fields=["scheduled_at"]),
            models.Index(fields=["partner", "scheduled_at"]),
            models.Index(fields=["partner", "status", "scheduled_at"]),
        ]

    def __str__(self):
        return f"Appointment: {self.customer} with {self.partner} at {self.scheduled_at}"
