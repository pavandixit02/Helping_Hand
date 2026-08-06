"""
Analytics models — Events, User Activity, Search History.

Translated from Prisma schema section 9: Analytics & Audit.
"""

import uuid

from django.db import models


class AnalyticsEvent(models.Model):
    """Platform-wide analytics events (page views, clicks, bookings)."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField(null=True, blank=True)
    event_type = models.CharField(max_length=50)
    screen_name = models.CharField(max_length=100, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self):
        return f"{self.event_type} at {self.timestamp}"


class UserActivity(models.Model):
    """User action log for engagement tracking."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField()
    action = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "User activities"
        ordering = ["-timestamp"]

    def __str__(self):
        return f"{self.action} by {self.user_id}"


class SearchHistory(models.Model):
    """Search query history for improving search relevance."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField(null=True, blank=True)
    query = models.CharField(max_length=500)
    filters = models.JSONField(default=dict, blank=True)
    results_found = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Search histories"
        ordering = ["-timestamp"]

    def __str__(self):
        return f'Search: "{self.query}" ({self.results_found} results)'
