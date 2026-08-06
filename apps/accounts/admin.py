"""Admin configuration for accounts models."""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import (
    Device,
    LoginHistory,
    OTP,
    Permission,
    RefreshToken,
    Role,
    RolePermission,
    User,
    UserSession,
    VerificationToken,
)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ("email", "role", "status", "is_staff", "is_email_verified", "created_at")
    list_filter = ("status", "role", "is_staff", "is_email_verified", "mfa_enabled")
    search_fields = ("email",)
    ordering = ("-created_at",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Role & Status", {"fields": ("role", "status", "is_email_verified", "mfa_enabled", "mfa_secret")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Timestamps", {"fields": ("created_at", "updated_at", "deleted_at")}),
    )
    readonly_fields = ("created_at", "updated_at")
    add_fieldsets = (
        (None, {"classes": ("wide",), "fields": ("email", "password1", "password2", "role", "status")}),
    )


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "created_at")
    search_fields = ("name",)


@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "created_at")
    search_fields = ("name",)


@admin.register(RolePermission)
class RolePermissionAdmin(admin.ModelAdmin):
    list_display = ("role", "permission")
    list_filter = ("role",)


@admin.register(UserSession)
class UserSessionAdmin(admin.ModelAdmin):
    list_display = ("user", "ip_address", "expires_at", "created_at")
    list_filter = ("created_at",)
    readonly_fields = ("token",)


@admin.register(RefreshToken)
class RefreshTokenAdmin(admin.ModelAdmin):
    list_display = ("user", "is_revoked", "expires_at", "created_at")
    list_filter = ("is_revoked",)


@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ("user", "type", "is_used", "expires_at")
    list_filter = ("type", "is_used")


@admin.register(VerificationToken)
class VerificationTokenAdmin(admin.ModelAdmin):
    list_display = ("email", "expires_at", "created_at")


@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    list_display = ("user", "device_type", "is_trusted", "last_active")
    list_filter = ("device_type", "is_trusted")


@admin.register(LoginHistory)
class LoginHistoryAdmin(admin.ModelAdmin):
    list_display = ("user", "ip_address", "success", "created_at")
    list_filter = ("success", "created_at")
    readonly_fields = ("user", "ip_address", "user_agent", "success", "created_at")
