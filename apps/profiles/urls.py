"""URL configuration for the profiles app."""

from django.urls import path

from . import views

app_name = "profiles"

urlpatterns = [
    path("", views.PatientListView.as_view(), name="patient-list"),
    path("<uuid:pk>/", views.PatientDetailView.as_view(), name="patient-detail"),
    path("doctors/", views.DoctorListView.as_view(), name="doctor-list"),
    path("doctors/<uuid:pk>/", views.DoctorDetailView.as_view(), name="doctor-detail"),
]
