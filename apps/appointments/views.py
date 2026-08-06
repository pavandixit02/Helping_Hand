"""Views for the appointments app."""

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import CreateView, DetailView, ListView

from .models import Appointment, Service


class AppointmentListView(LoginRequiredMixin, ListView):
    model = Appointment
    template_name = "appointments/appointment_list.html"
    context_object_name = "appointments"
    paginate_by = 20


class AppointmentDetailView(LoginRequiredMixin, DetailView):
    model = Appointment
    template_name = "appointments/appointment_detail.html"
    context_object_name = "appointment"


class AppointmentCreateView(LoginRequiredMixin, CreateView):
    model = Appointment
    template_name = "appointments/appointment_form.html"
    fields = ["partner", "service", "scheduled_at", "notes"]


class ServiceListView(LoginRequiredMixin, ListView):
    model = Service
    template_name = "appointments/service_list.html"
    context_object_name = "services"
    paginate_by = 20

    def get_queryset(self):
        return Service.objects.filter(is_active=True)
