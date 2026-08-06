"""Admin for workflow models."""

from django.contrib import admin
from .models import ApprovalWorkflow


@admin.register(ApprovalWorkflow)
class ApprovalWorkflowAdmin(admin.ModelAdmin):
    list_display = ("type", "reference_id", "status", "step", "created_at")
    list_filter = ("type", "status")
