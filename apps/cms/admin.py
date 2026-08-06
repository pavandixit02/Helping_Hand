"""Admin configuration for CMS models."""

from django.contrib import admin
from .models import Article, FAQ


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "author_id", "created_at")
    list_filter = ("status",)
    prepopulated_fields = {"slug": ("title",)}


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "category", "is_active", "order")
    list_filter = ("category", "is_active")
    list_editable = ("order",)
