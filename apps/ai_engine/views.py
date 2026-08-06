"""Views for the AI Engine app."""

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView

from .models import PromptLog


class PromptLogListView(LoginRequiredMixin, ListView):
    model = PromptLog
    template_name = "ai_engine/prompt_log_list.html"
    context_object_name = "prompt_logs"
    paginate_by = 50
