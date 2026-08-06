"""Admin configuration for profiles models."""

from django.contrib import admin

from .models import (
    Consent,
    CustomerProfile,
    Insurance,
    MedicalDocument,
    OperatorProfile,
    PartnerKYC,
    PartnerProfile,
)


@admin.register(CustomerProfile)
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ("full_name", "phone", "user", "created_at")
    search_fields = ("first_name", "last_name", "phone")


@admin.register(PartnerProfile)
class PartnerProfileAdmin(admin.ModelAdmin):
    list_display = ("full_name", "specialty", "verification_status", "average_rating")
    list_filter = ("specialty", "verification_status")
    search_fields = ("first_name", "last_name", "specialty")


@admin.register(OperatorProfile)
class OperatorProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "department", "level")
    list_filter = ("department",)


@admin.register(PartnerKYC)
class PartnerKYCAdmin(admin.ModelAdmin):
    list_display = ("partner", "document_type", "status", "created_at")
    list_filter = ("status",)


@admin.register(MedicalDocument)
class MedicalDocumentAdmin(admin.ModelAdmin):
    list_display = ("title", "customer", "doc_type", "uploaded_at")
    list_filter = ("doc_type",)


@admin.register(Consent)
class ConsentAdmin(admin.ModelAdmin):
    list_display = ("customer", "type", "is_granted", "timestamp")
    list_filter = ("type", "is_granted")


@admin.register(Insurance)
class InsuranceAdmin(admin.ModelAdmin):
    list_display = ("customer", "provider", "verified")
    list_filter = ("verified",)
