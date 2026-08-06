"""Views for the profiles app."""

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import DetailView, ListView

from .models import CustomerProfile, PartnerProfile


class PatientListView(LoginRequiredMixin, ListView):
    model = CustomerProfile
    template_name = "profiles/patient_list.html"
    context_object_name = "patients"
    paginate_by = 20


class PatientDetailView(LoginRequiredMixin, DetailView):
    model = CustomerProfile
    template_name = "profiles/patient_detail.html"
    context_object_name = "patient"


class DoctorListView(LoginRequiredMixin, ListView):
    model = PartnerProfile
    template_name = "profiles/doctor_list.html"
    context_object_name = "doctors"
    paginate_by = 20

    def get_queryset(self):
        return PartnerProfile.objects.filter(verification_status="VERIFIED")


class DoctorDetailView(LoginRequiredMixin, DetailView):
    model = PartnerProfile
    template_name = "profiles/doctor_detail.html"
    context_object_name = "doctor"
