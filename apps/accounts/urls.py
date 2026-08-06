"""URL configuration for the accounts app."""

from django.urls import path

from . import views

app_name = "accounts"

urlpatterns = [
    path("profile/", views.UserProfileView.as_view(), name="profile"),
    path("users/", views.UserListView.as_view(), name="user-list"),
]
