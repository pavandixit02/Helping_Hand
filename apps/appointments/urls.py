"""URL configuration for the appointments app."""

from django.urls import path

from . import views

app_name = "appointments"

urlpatterns = [
    path("", views.AppointmentListView.as_view(), name="appointment-list"),
    path("new/", views.AppointmentCreateView.as_view(), name="appointment-create"),
    path("<uuid:pk>/", views.AppointmentDetailView.as_view(), name="appointment-detail"),
    path("services/", views.ServiceListView.as_view(), name="service-list"),
]
