"""URL configuration for the communication app."""

from django.urls import path

from . import views

app_name = "communication"

urlpatterns = [
    path("conversations/", views.ConversationListView.as_view(), name="conversation-list"),
    path("conversations/<uuid:pk>/", views.ConversationDetailView.as_view(), name="conversation-detail"),
    path("notifications/", views.NotificationListView.as_view(), name="notification-list"),
]
