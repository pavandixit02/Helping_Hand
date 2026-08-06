"""
Accounts models — Custom User, Roles, Permissions, Sessions, OTP, Devices.

Translated from Prisma schema:
  - Section 1: RBAC (Dynamic Roles & Permissions)
  - Section 2: Authentication & Core User Identity
"""

import uuid

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from .managers import UserManager


# ============================================================================
# 1. RBAC — Dynamic Roles & Permissions
# ============================================================================


class Role(models.Model):
    """
    Dynamic role for RBAC.
    Examples: PATIENT, DOCTOR, HOSPITAL_ADMIN, PHARMACIST, EMT, NGO_COORDINATOR.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)
    permissions = models.ManyToManyField(
        "Permission",
        through="RolePermission",
        related_name="roles",
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Permission(models.Model):
    """
    Granular permission for RBAC.
    Examples: 'appointment:read', 'wallet:write', 'patient_records:delete'.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class RolePermission(models.Model):
    """Through table for Role ↔ Permission many-to-many relationship."""

    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("role", "permission")

    def __str__(self):
        return f"{self.role.name} → {self.permission.name}"


# ============================================================================
# 2. Authentication & Core User Identity
# ============================================================================


class UserStatus(models.TextChoices):
    ACTIVE = "ACTIVE", "Active"
    SUSPENDED = "SUSPENDED", "Suspended"
    PENDING = "PENDING", "Pending"
    BANNED = "BANNED", "Banned"


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model using email as the primary identifier.
    Extends Django's AbstractBaseUser for full control over authentication.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    role = models.ForeignKey(
        Role,
        on_delete=models.PROTECT,
        related_name="users",
        null=True,
        blank=True,
    )
    is_email_verified = models.BooleanField(default=False)
    mfa_enabled = models.BooleanField(default=False)
    mfa_secret = models.CharField(max_length=255, blank=True)
    status = models.CharField(
        max_length=20,
        choices=UserStatus.choices,
        default=UserStatus.PENDING,
    )

    # Django required fields
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.email

    @property
    def is_deleted(self):
        return self.deleted_at is not None


class UserSession(models.Model):
    """Active user sessions for session management and security auditing."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sessions")
    token = models.CharField(max_length=500, unique=True)
    expires_at = models.DateTimeField()
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Session for {self.user.email} (expires {self.expires_at})"


class RefreshToken(models.Model):
    """Refresh tokens for API authentication (DRF token refresh)."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="refresh_tokens"
    )
    token = models.CharField(max_length=500, unique=True)
    is_revoked = models.BooleanField(default=False)
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"RefreshToken for {self.user.email}"


class OTP(models.Model):
    """One-time passwords for email verification, password reset, and MFA."""

    class OTPType(models.TextChoices):
        EMAIL_VERIFICATION = "EMAIL_VERIFICATION", "Email Verification"
        PASSWORD_RESET = "PASSWORD_RESET", "Password Reset"
        MFA = "MFA", "Multi-Factor Authentication"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="otps")
    code = models.CharField(max_length=10)
    type = models.CharField(max_length=30, choices=OTPType.choices)
    is_used = models.BooleanField(default=False)
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "OTP"
        verbose_name_plural = "OTPs"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.type} OTP for {self.user.email}"


class VerificationToken(models.Model):
    """Time-limited tokens for email verification and password reset links."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    token = models.CharField(max_length=500, unique=True)
    email = models.EmailField()
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Verification token for {self.email}"


class Device(models.Model):
    """Registered user devices for push notifications and trusted device management."""

    class DeviceType(models.TextChoices):
        IOS = "IOS", "iOS"
        ANDROID = "ANDROID", "Android"
        WEB = "WEB", "Web"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="devices")
    device_id = models.CharField(max_length=255, unique=True)
    device_type = models.CharField(max_length=10, choices=DeviceType.choices)
    fcm_push_token = models.TextField(blank=True)
    last_active = models.DateTimeField(auto_now=True)
    is_trusted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-last_active"]

    def __str__(self):
        return f"{self.device_type} device for {self.user.email}"


class LoginHistory(models.Model):
    """Immutable log of all login attempts for security auditing."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="login_history"
    )
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    success = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Login histories"
        ordering = ["-created_at"]

    def __str__(self):
        status = "success" if self.success else "failed"
        return f"Login {status} for {self.user.email} at {self.created_at}"
