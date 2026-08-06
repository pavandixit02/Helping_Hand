"""URL configuration for the billing app."""

from django.urls import path

from . import views

app_name = "billing"

urlpatterns = [
    path("wallet/", views.WalletView.as_view(), name="wallet"),
    path("payments/", views.PaymentListView.as_view(), name="payment-list"),
]
