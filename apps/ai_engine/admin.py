"""Admin configuration for AI Engine models."""

from django.contrib import admin

from .models import AIMatch, AIRecommendation, EmbeddingMetadata, PromptLog


@admin.register(PromptLog)
class PromptLogAdmin(admin.ModelAdmin):
    list_display = ("prompt_id", "model", "tokens_used", "cost", "latency_ms", "timestamp")
    list_filter = ("model",)
    readonly_fields = ("prompt_text", "response")


@admin.register(AIMatch)
class AIMatchAdmin(admin.ModelAdmin):
    list_display = ("customer_id", "matched_partner_id", "confidence_score", "was_successful")
    list_filter = ("was_successful",)


@admin.register(AIRecommendation)
class AIRecommendationAdmin(admin.ModelAdmin):
    list_display = ("user_id", "confidence_score", "action_taken", "created_at")
    list_filter = ("action_taken",)


@admin.register(EmbeddingMetadata)
class EmbeddingMetadataAdmin(admin.ModelAdmin):
    list_display = ("entity_type", "entity_id", "model_used", "updated_at")
    list_filter = ("entity_type",)
