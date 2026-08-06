"""Forms for the profiles app."""

from django import forms

from .models import CustomerProfile, PartnerProfile


class CustomerProfileForm(forms.ModelForm):
    class Meta:
        model = CustomerProfile
        fields = ["first_name", "last_name", "phone"]


class PartnerProfileForm(forms.ModelForm):
    class Meta:
        model = PartnerProfile
        fields = ["first_name", "last_name", "specialty", "license_number", "bio"]
