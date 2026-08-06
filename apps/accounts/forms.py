"""Forms for the accounts app."""

from django import forms

from .models import User


class UserUpdateForm(forms.ModelForm):
    """Form for updating user profile information."""

    class Meta:
        model = User
        fields = ["email"]
