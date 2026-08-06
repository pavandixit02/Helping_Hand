"""Dashboard views — role-based HTMX control panels."""

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView


class HomeView(TemplateView):
    """Public landing page."""
    template_name = "dashboard/home.html"


class DashboardView(LoginRequiredMixin, TemplateView):
    """Main dashboard — renders role-appropriate content."""
    template_name = "dashboard/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.request.user
        context["user_role"] = getattr(user.role, "name", "UNKNOWN") if user.role else "UNKNOWN"
        return context
