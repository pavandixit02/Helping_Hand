"""Custom decorators for permission checks and rate limiting."""

import functools

from django.core.exceptions import PermissionDenied


def role_required(*role_names):
    """Decorator to restrict view access to specific roles."""
    def decorator(view_func):
        @functools.wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if not request.user.is_authenticated:
                raise PermissionDenied("Authentication required.")
            user_role = getattr(request.user.role, "name", None)
            if user_role not in role_names:
                raise PermissionDenied(f"Role '{user_role}' is not authorized for this action.")
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator
