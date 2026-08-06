"""
API v1 serializers — Django REST Framework model serializers.
"""

from rest_framework import serializers

from apps.appointments.models import Appointment, Service


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "name", "description", "price", "duration_minutes", "is_active"]
        read_only_fields = ["id"]


class AppointmentSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source="service.name", read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id",
            "customer",
            "partner",
            "service",
            "service_name",
            "scheduled_at",
            "status",
            "meeting_link",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
