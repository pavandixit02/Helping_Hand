"""
Profiles models — Customer, Partner, Operator profiles, KYC, Documents, Consent, Insurance.

Translated from Prisma schema section 3: User Profiles & Healthcare Core.
"""

import uuid

from django.db import models


class VerificationStatus(models.TextChoices):
    PENDING = "PENDING", "Pending"
    VERIFIED = "VERIFIED", "Verified"
    REJECTED = "REJECTED", "Rejected"
    SUSPENDED = "SUSPENDED", "Suspended"


class CustomerProfile(models.Model):
    """Patient/Customer profile with medical and emergency contact information."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        "accounts.User", on_delete=models.CASCADE, related_name="customer_profile"
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, blank=True)
    address = models.JSONField(default=dict, blank=True)
    emergency_contact = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["last_name", "first_name"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class OperatorProfile(models.Model):
    """Internal operator/staff profile with department and access level."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        "accounts.User", on_delete=models.CASCADE, related_name="operator_profile"
    )
    department = models.CharField(max_length=100)
    level = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Operator: {self.user.email} ({self.department})"


class PartnerProfile(models.Model):
    """
    Healthcare partner profile (Doctors, Specialists, Caregivers).
    Includes verification status, specialty, and location data.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        "accounts.User", on_delete=models.CASCADE, related_name="partner_profile"
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100)
    license_number = models.CharField(max_length=100)  # Encrypted in production
    verification_status = models.CharField(
        max_length=20,
        choices=VerificationStatus.choices,
        default=VerificationStatus.PENDING,
    )
    bio = models.TextField(blank=True)
    average_rating = models.FloatField(default=0.0)
    total_reviews = models.IntegerField(default=0)
    location = models.JSONField(default=dict, blank=True)  # PostGIS candidate
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-average_rating"]

    def __str__(self):
        return f"Dr. {self.first_name} {self.last_name} ({self.specialty})"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class PartnerKYC(models.Model):
    """Know Your Customer document for partner verification."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    partner = models.OneToOneField(
        PartnerProfile, on_delete=models.CASCADE, related_name="kyc"
    )
    document_type = models.CharField(max_length=50)
    document_url = models.URLField()  # S3 URI
    verified_by = models.UUIDField(null=True, blank=True)  # Operator ID
    verified_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=VerificationStatus.choices)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Partner KYC"
        verbose_name_plural = "Partner KYCs"

    def __str__(self):
        return f"KYC: {self.partner} ({self.status})"


class MedicalDocument(models.Model):
    """Uploaded medical documents (prescriptions, lab reports, scans)."""

    class DocType(models.TextChoices):
        PRESCRIPTION = "PRESCRIPTION", "Prescription"
        LAB_REPORT = "LAB_REPORT", "Lab Report"
        SCAN = "SCAN", "Scan"
        DISCHARGE_SUMMARY = "DISCHARGE_SUMMARY", "Discharge Summary"
        OTHER = "OTHER", "Other"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(
        CustomerProfile, on_delete=models.CASCADE, related_name="medical_documents"
    )
    title = models.CharField(max_length=200)
    file_url = models.URLField()  # Encrypted S3 URI
    doc_type = models.CharField(max_length=30, choices=DocType.choices)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self):
        return f"{self.title} ({self.doc_type})"


class Consent(models.Model):
    """Patient consent records for HIPAA/GDPR compliance."""

    class ConsentType(models.TextChoices):
        DATA_PROCESSING = "DATA_PROCESSING", "Data Processing"
        TELEHEALTH = "TELEHEALTH", "Telehealth"
        MARKETING = "MARKETING", "Marketing"
        RESEARCH = "RESEARCH", "Research"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(
        CustomerProfile, on_delete=models.CASCADE, related_name="consents"
    )
    type = models.CharField(max_length=30, choices=ConsentType.choices)
    is_granted = models.BooleanField()
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self):
        status = "granted" if self.is_granted else "revoked"
        return f"{self.type} consent {status} by {self.customer}"


class Insurance(models.Model):
    """Patient insurance policy information."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.OneToOneField(
        CustomerProfile, on_delete=models.CASCADE, related_name="insurance"
    )
    provider = models.CharField(max_length=200)
    policy_no = models.CharField(max_length=100)  # Encrypted
    verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.provider} - {self.customer}"
