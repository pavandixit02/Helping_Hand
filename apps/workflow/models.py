"""
Workflow models — Approval Workflows.

Translated from Prisma schema section 13: Workflow Engine.
"""

import uuid

from django.db import models


class ApprovalWorkflow(models.Model):
    """Multi-step approval workflow for refunds, KYC, and other processes."""

    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        APPROVED = "APPROVED", "Approved"
        REJECTED = "REJECTED", "Rejected"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=50)  # 'REFUND', 'KYC', etc.
    reference_id = models.UUIDField()
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    step = models.IntegerField(default=1)
    config = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Workflow: {self.type} ({self.status}, Step {self.step})"
