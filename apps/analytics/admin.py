"""Admin configuration for analytics models."""

from django.contrib import admin
from .models import AnalyticsEvent, UserActivity, SearchHistory


@admin.register(AnalyticsEvent)
class AnalyticsEventAdmin(admin.ModelAdmin):
    list_display = ("event_type", "user_id", "screen_name", "timestamp")
    list_filter = ("event_type",)


@admin.register(UserActivity)
class UserActivityAdmin(admin.ModelAdmin):
    list_display = ("user_id", "action", "timestamp")


@admin.register(SearchHistory)
class SearchHistoryAdmin(admin.ModelAdmin):
    list_display = ("query", "user_id", "results_found", "timestamp")
