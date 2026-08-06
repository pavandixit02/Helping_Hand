"""URL configuration for the AI Engine app."""

from django.urls import path

from . import views

app_name = "ai_engine"

urlpatterns = [
    path("logs/", views.PromptLogListView.as_view(), name="prompt-log-list"),
]
