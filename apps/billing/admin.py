"""Admin configuration for billing models."""

from django.contrib import admin

from .models import (
    Cashback,
    Commission,
    Invoice,
    PartnerPayout,
    Payment,
    PlatformRevenue,
    Refund,
    Settlement,
    Wallet,
    WalletLedger,
    WalletTransaction,
)


@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ("user", "balance", "currency", "updated_at")
    readonly_fields = ("balance",)


@admin.register(WalletTransaction)
class WalletTransactionAdmin(admin.ModelAdmin):
    list_display = ("wallet", "type", "amount", "reference_type", "status", "created_at")
    list_filter = ("type", "status", "reference_type")


@admin.register(WalletLedger)
class WalletLedgerAdmin(admin.ModelAdmin):
    list_display = ("wallet", "balance_before", "balance_after", "created_at")
    readonly_fields = ("wallet", "balance_before", "balance_after")


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("appointment", "amount", "status", "gateway_order_id", "created_at")
    list_filter = ("status",)


@admin.register(Commission)
class CommissionAdmin(admin.ModelAdmin):
    list_display = ("payment", "platform_revenue", "partner_amount")


@admin.register(PartnerPayout)
class PartnerPayoutAdmin(admin.ModelAdmin):
    list_display = ("partner_id", "amount", "status", "created_at")
    list_filter = ("status",)


@admin.register(Settlement)
class SettlementAdmin(admin.ModelAdmin):
    list_display = ("payment", "partner_payout", "status")
    list_filter = ("status",)


@admin.register(Refund)
class RefundAdmin(admin.ModelAdmin):
    list_display = ("payment", "amount", "status", "created_at")
    list_filter = ("status",)


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ("payment", "invoice_url", "generated_at")


@admin.register(Cashback)
class CashbackAdmin(admin.ModelAdmin):
    list_display = ("user_id", "amount", "reason", "status")


@admin.register(PlatformRevenue)
class PlatformRevenueAdmin(admin.ModelAdmin):
    list_display = ("source_type", "amount", "date")
    list_filter = ("source_type",)
