"""
CMS models — Articles and FAQ.

Translated from Prisma schema section 10: CMS Platform.
"""

import uuid

from django.db import models


class Article(models.Model):
    """CMS article/blog post."""

    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        PUBLISHED = "PUBLISHED", "Published"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=300)
    slug = models.SlugField(unique=True, max_length=300)
    content = models.TextField()
    author_id = models.UUIDField()
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.DRAFT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class FAQ(models.Model):
    """Frequently asked questions."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.CharField(max_length=100)
    question = models.CharField(max_length=500)
    answer = models.TextField()
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"
        ordering = ["order"]

    def __str__(self):
        return self.question
