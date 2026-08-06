"""
API v1 URL configuration.

Routes for the Django REST Framework API consumed by mobile apps and external integrations.
"""

from django.urls import path

from . import views

app_name = "api_v1"

urlpatterns = [
    # Health check
    path("health/", views.health_check, name="health-check"),

    # Authentication
    path("auth/login/", views.LoginView.as_view(), name="login"),

    # Appointments
    path("appointments/", views.AppointmentListCreateView.as_view(), name="appointment-list"),
    path("appointments/<uuid:pk>/", views.AppointmentDetailView.as_view(), name="appointment-detail"),

    # Services
    path("services/", views.ServiceListView.as_view(), name="service-list"),
]
