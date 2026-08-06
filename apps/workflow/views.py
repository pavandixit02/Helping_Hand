"""Views for the workflow app."""

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView
from .models import ApprovalWorkflow


class WorkflowListView(LoginRequiredMixin, ListView):
    model = ApprovalWorkflow
    template_name = "workflow/workflow_list.html"
    context_object_name = "workflows"
    paginate_by = 20
