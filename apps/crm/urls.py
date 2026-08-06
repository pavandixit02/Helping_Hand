"""URL configuration for the CRM app."""

from django.urls import path
from . import views

app_name = "crm"

urlpatterns = [
    path("tickets/", views.TicketListView.as_view(), name="ticket-list"),
    path("tickets/new/", views.TicketCreateView.as_view(), name="ticket-create"),
    path("tickets/<uuid:pk>/", views.TicketDetailView.as_view(), name="ticket-detail"),
]
