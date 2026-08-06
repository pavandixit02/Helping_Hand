"""
Audit models — Audit Logs and System Configuration.

Translated from Prisma schema section 12: Audit & Configuration.
"""

import uuid

from django.db import models


class AuditLog(models.Model):
    """Immutable audit log entry for compliance and security."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField(null=True, blank=True)
    action = models.CharField(max_length=100)
    resource = models.CharField(max_length=100)
    resource_id = models.CharField(max_length=255, blank=True)
    details = models.JSONField(default=dict, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.action} on {self.resource} by {self.user_id}"


class SystemConfig(models.Model):
    """Dynamic system configuration key-value store."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    key = models.CharField(max_length=100, unique=True)
    value = models.JSONField()
    description = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.UUIDField(null=True, blank=True)

    class Meta:
        ordering = ["key"]

    def __str__(self):
        return self.key
