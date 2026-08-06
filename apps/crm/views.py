"""Views for the CRM app."""

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import CreateView, DetailView, ListView

from .models import SupportTicket


class TicketListView(LoginRequiredMixin, ListView):
    model = SupportTicket
    template_name = "crm/ticket_list.html"
    context_object_name = "tickets"
    paginate_by = 20


class TicketDetailView(LoginRequiredMixin, DetailView):
    model = SupportTicket
    template_name = "crm/ticket_detail.html"
    context_object_name = "ticket"


class TicketCreateView(LoginRequiredMixin, CreateView):
    model = SupportTicket
    template_name = "crm/ticket_form.html"
    fields = ["subject", "description", "priority"]
