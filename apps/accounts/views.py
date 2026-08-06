"""Views for the accounts app."""

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import DetailView, ListView

from .models import User


class UserProfileView(LoginRequiredMixin, DetailView):
    """Display the current user's profile."""

    model = User
    template_name = "accounts/profile.html"
    context_object_name = "profile_user"

    def get_object(self):
        return self.request.user


class UserListView(LoginRequiredMixin, ListView):
    """Admin view to list all users (restricted by permissions)."""

    model = User
    template_name = "accounts/user_list.html"
    context_object_name = "users"
    paginate_by = 20
