"""
AI Engine models — Prompt Logs, AI Matches, Recommendations, Embedding Metadata.

Translated from Prisma schema section 8: AI Platform Core.
"""

import uuid

from django.db import models


class PromptLog(models.Model):
    """Immutable log of all LLM interactions for auditing and cost tracking."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    prompt_id = models.CharField(max_length=100)
    user_id = models.UUIDField(null=True, blank=True)
    model = models.CharField(max_length=50)  # e.g., 'gpt-4o'
    prompt_text = models.TextField()  # PII scrubbed
    response = models.TextField()
    latency_ms = models.IntegerField()
    tokens_used = models.IntegerField()
    cost = models.DecimalField(max_digits=10, decimal_places=5, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self):
        return f"Prompt {self.prompt_id} ({self.model}, {self.tokens_used} tokens)"


class AIMatch(models.Model):
    """AI-generated patient-to-partner matching record."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer_id = models.UUIDField()
    matched_partner_id = models.UUIDField()
    confidence_score = models.FloatField()
    factors = models.JSONField(default=dict)  # Why they matched
    was_successful = models.BooleanField(null=True, blank=True)  # Feedback loop
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-confidence_score"]

    def __str__(self):
        return f"AI Match: {self.customer_id} → {self.matched_partner_id} ({self.confidence_score:.2f})"


class AIRecommendation(models.Model):
    """AI-generated recommendation for a user."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField()
    recommendation = models.TextField()
    confidence_score = models.FloatField()
    action_taken = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Recommendation for {self.user_id} ({self.confidence_score:.2f})"


class EmbeddingMetadata(models.Model):
    """Metadata tracking for vector embeddings stored in pgvector."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    entity_type = models.CharField(max_length=50)  # 'PARTNER', 'CLINICAL_GUIDELINE'
    entity_id = models.UUIDField()
    model_used = models.CharField(max_length=100)  # e.g., 'text-embedding-3-small'
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Embedding metadata"

    def __str__(self):
        return f"Embedding: {self.entity_type} {self.entity_id}"
