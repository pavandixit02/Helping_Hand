"""Views for the audit app."""

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView
from .models import AuditLog


class AuditLogListView(LoginRequiredMixin, ListView):
    model = AuditLog
    template_name = "audit/audit_log_list.html"
    context_object_name = "logs"
    paginate_by = 50
