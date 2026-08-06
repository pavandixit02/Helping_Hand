"""
Root URL configuration for Helping Hand.

Routes requests to all Django apps and the DRF API layer.
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    # Django Admin
    path("admin/", admin.site.urls),

    # Authentication (django-allauth)
    path("accounts/", include("allauth.urls")),

    # App URLs
    path("", include("apps.dashboard.urls")),
    path("patients/", include("apps.profiles.urls")),
    path("appointments/", include("apps.appointments.urls")),
    path("billing/", include("apps.billing.urls")),
    path("chat/", include("apps.communication.urls")),
    path("pharmacy/", include("apps.cms.urls")),
    path("analytics/", include("apps.analytics.urls")),
    path("crm/", include("apps.crm.urls")),
    path("emergency/", include("apps.workflow.urls")),

    # API (Django REST Framework)
    path("api/v1/", include("api.v1.urls")),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

    # Django Debug Toolbar
    try:
        import debug_toolbar
        urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]
    except ImportError:
        pass

# Admin site customization
admin.site.site_header = "Helping Hand Administration"
admin.site.site_title = "Helping Hand Admin"
admin.site.index_title = "Healthcare Ecosystem Management"
