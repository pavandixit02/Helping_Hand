"""Views for the analytics app."""

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView


class AnalyticsDashboardView(LoginRequiredMixin, TemplateView):
    template_name = "analytics/dashboard.html"
