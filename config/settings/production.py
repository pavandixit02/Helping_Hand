"""
Production settings for Helping Hand.

Security-hardened configuration for deployment.
"""

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

from .base import *  # noqa: F401, F403

# ---------------------------------------------------------------------------
# Security
# ---------------------------------------------------------------------------
DEBUG = False
ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "").split(",")  # noqa: F405

# HTTPS enforcement
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Cookie security
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_HTTPONLY = True

# Content security
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = "DENY"

# ---------------------------------------------------------------------------
# CORS — restrict to known origins in production
# ---------------------------------------------------------------------------
CORS_ALLOWED_ORIGINS = os.environ.get("CORS_ALLOWED_ORIGINS", "").split(",")  # noqa: F405

# ---------------------------------------------------------------------------
# Static files — served via Nginx / CDN in production
# ---------------------------------------------------------------------------
STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"

# ---------------------------------------------------------------------------
# Email — SMTP in production
# ---------------------------------------------------------------------------
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

# ---------------------------------------------------------------------------
# Sentry Error Tracking
# ---------------------------------------------------------------------------
if SENTRY_DSN:  # noqa: F405
    sentry_sdk.init(
        dsn=SENTRY_DSN,  # noqa: F405
        integrations=[DjangoIntegration()],
        traces_sample_rate=0.1,
        send_default_pii=False,
    )

# ---------------------------------------------------------------------------
# Logging — structured JSON in production
# ---------------------------------------------------------------------------
LOGGING["handlers"]["console"]["formatter"] = "verbose"  # noqa: F405
LOGGING["root"]["level"] = "WARNING"  # noqa: F405
