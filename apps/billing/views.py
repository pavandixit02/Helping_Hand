"""Views for the billing app."""

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import DetailView, ListView

from .models import Payment, Wallet


class WalletView(LoginRequiredMixin, DetailView):
    model = Wallet
    template_name = "billing/wallet.html"
    context_object_name = "wallet"

    def get_object(self):
        wallet, _ = Wallet.objects.get_or_create(user=self.request.user)
        return wallet


class PaymentListView(LoginRequiredMixin, ListView):
    model = Payment
    template_name = "billing/payment_list.html"
    context_object_name = "payments"
    paginate_by = 20
