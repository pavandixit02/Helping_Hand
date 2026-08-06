"""
Billing models — Wallet, Transactions, Payments, Commissions, Settlements, Refunds, Invoices.

Translated from Prisma schema section 6: Wallet & Financial System.
"""

import uuid

from django.db import models


# ============================================================================
# Wallet System
# ============================================================================


class Wallet(models.Model):
    """User wallet for balance tracking."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        "accounts.User", on_delete=models.CASCADE, related_name="wallet"
    )
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    currency = models.CharField(max_length=3, default="INR")
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Wallet: {self.user.email} — {self.currency} {self.balance}"


class TransactionType(models.TextChoices):
    CREDIT = "CREDIT", "Credit"
    DEBIT = "DEBIT", "Debit"


class ReferenceType(models.TextChoices):
    APPOINTMENT = "APPOINTMENT", "Appointment"
    REFUND = "REFUND", "Refund"
    CASHBACK = "CASHBACK", "Cashback"
    WITHDRAWAL = "WITHDRAWAL", "Withdrawal"


class TransactionStatus(models.TextChoices):
    SUCCESS = "SUCCESS", "Success"
    PENDING = "PENDING", "Pending"
    FAILED = "FAILED", "Failed"


class WalletTransaction(models.Model):
    """Individual wallet transaction record."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    wallet = models.ForeignKey(
        Wallet, on_delete=models.CASCADE, related_name="transactions"
    )
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    type = models.CharField(max_length=10, choices=TransactionType.choices)
    reference_type = models.CharField(max_length=20, choices=ReferenceType.choices)
    reference_id = models.UUIDField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=TransactionStatus.choices)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["wallet", "status", "created_at"]),
        ]

    def __str__(self):
        return f"{self.type} {self.amount} ({self.status})"


class WalletLedger(models.Model):
    """Immutable ledger entries for wallet balance auditing."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    wallet = models.ForeignKey(
        Wallet, on_delete=models.CASCADE, related_name="ledger_entries"
    )
    balance_before = models.DecimalField(max_digits=12, decimal_places=2)
    balance_after = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Ledger: {self.balance_before} → {self.balance_after}"


# ============================================================================
# Payment System
# ============================================================================


class PaymentStatus(models.TextChoices):
    PENDING = "PENDING", "Pending"
    SUCCESS = "SUCCESS", "Success"
    FAILED = "FAILED", "Failed"
    REFUNDED = "REFUNDED", "Refunded"


class Payment(models.Model):
    """Payment record linked to an appointment."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    appointment = models.OneToOneField(
        "appointments.Appointment",
        on_delete=models.CASCADE,
        related_name="payment",
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=10, choices=PaymentStatus.choices, default=PaymentStatus.PENDING
    )
    gateway_order_id = models.CharField(max_length=255, unique=True)
    gateway_payment_id = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Payment ₹{self.amount} ({self.status})"


class Commission(models.Model):
    """Platform commission split from a payment."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    payment = models.OneToOneField(
        Payment, on_delete=models.CASCADE, related_name="commission"
    )
    platform_revenue = models.DecimalField(max_digits=10, decimal_places=2)
    partner_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Commission: Platform ₹{self.platform_revenue}, Partner ₹{self.partner_amount}"


class PayoutStatus(models.TextChoices):
    INITIATED = "INITIATED", "Initiated"
    COMPLETED = "COMPLETED", "Completed"
    FAILED = "FAILED", "Failed"


class PartnerPayout(models.Model):
    """Payout disbursement to a partner."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    partner_id = models.UUIDField()
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=10, choices=PayoutStatus.choices)
    bank_txn_ref = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Payout ₹{self.amount} ({self.status})"


class SettlementStatus(models.TextChoices):
    PENDING = "PENDING", "Pending"
    PROCESSED = "PROCESSED", "Processed"


class Settlement(models.Model):
    """Settlement linking a payment to a partner payout."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    payment = models.OneToOneField(
        Payment, on_delete=models.CASCADE, related_name="settlement"
    )
    partner_payout = models.ForeignKey(
        PartnerPayout, on_delete=models.CASCADE, related_name="settlements"
    )
    status = models.CharField(max_length=10, choices=SettlementStatus.choices)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Settlement for Payment {self.payment_id} ({self.status})"


class RefundStatus(models.TextChoices):
    INITIATED = "INITIATED", "Initiated"
    COMPLETED = "COMPLETED", "Completed"
    FAILED = "FAILED", "Failed"


class Refund(models.Model):
    """Refund record linked to a payment."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    payment = models.OneToOneField(
        Payment, on_delete=models.CASCADE, related_name="refund"
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=RefundStatus.choices)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Refund ₹{self.amount} ({self.status})"


class Invoice(models.Model):
    """Generated invoice for a payment."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    payment = models.OneToOneField(
        Payment, on_delete=models.CASCADE, related_name="invoice"
    )
    invoice_url = models.URLField()  # S3 URI
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Invoice for Payment {self.payment_id}"


class Cashback(models.Model):
    """Cashback rewards for users."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    reason = models.CharField(max_length=255)
    status = models.CharField(max_length=20, default="APPLIED")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cashback ₹{self.amount} ({self.status})"


class PlatformRevenue(models.Model):
    """Aggregate platform revenue tracking."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source_type = models.CharField(max_length=30)  # 'COMMISSION', 'SUBSCRIPTION'
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date"]

    def __str__(self):
        return f"Revenue ₹{self.amount} from {self.source_type}"
