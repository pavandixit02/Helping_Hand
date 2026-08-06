"""
Development settings for Helping Hand.
"""

from .base import *  # noqa: F401, F403

# ---------------------------------------------------------------------------
# Debug
# ---------------------------------------------------------------------------
DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0", "testserver"]

# ---------------------------------------------------------------------------
# Development-only apps
# ---------------------------------------------------------------------------
INSTALLED_APPS += [  # noqa: F405
    "debug_toolbar",
    "django_extensions",
]

MIDDLEWARE.insert(0, "debug_toolbar.middleware.DebugToolbarMiddleware")  # noqa: F405

# Django Debug Toolbar
INTERNAL_IPS = ["127.0.0.1"]

# ---------------------------------------------------------------------------
# Email — console output in development
# ---------------------------------------------------------------------------
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# ---------------------------------------------------------------------------
# Session — allow insecure cookies in dev
# ---------------------------------------------------------------------------
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

# ---------------------------------------------------------------------------
# CORS — allow all in development
# ---------------------------------------------------------------------------
CORS_ALLOW_ALL_ORIGINS = True

# ---------------------------------------------------------------------------
# Logging — verbose in development
# ---------------------------------------------------------------------------
LOGGING["loggers"]["apps"]["level"] = "DEBUG"  # noqa: F405

# ---------------------------------------------------------------------------
# Fallback to SQLite and local services for easy running without Docker
# ---------------------------------------------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.dummy.DummyCache",
    }
}

# Use local memory for celery during dev
CELERY_BROKER_URL = "memory://"
CELERY_RESULT_BACKEND = "cache+memory://"

