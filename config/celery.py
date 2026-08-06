"""
Celery configuration for Helping Hand.

Initializes the Celery app and auto-discovers tasks from all Django apps.
"""

import os

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")

app = Celery("helping_hand")

# Load config from Django settings, using the CELERY_ namespace
app.config_from_object("django.conf:settings", namespace="CELERY")

# Auto-discover tasks.py in all installed apps
app.autodiscover_tasks()


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    """Debug task for verifying Celery connectivity."""
    print(f"Request: {self.request!r}")
