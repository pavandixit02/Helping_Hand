"""URL configuration for the workflow app."""

from django.urls import path
from . import views

app_name = "workflow"

urlpatterns = [
    path("", views.WorkflowListView.as_view(), name="workflow-list"),
]
