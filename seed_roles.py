import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")
django.setup()

from apps.accounts.models import Role, User
from django.contrib.auth.hashers import make_password

roles = ['CUSTOMER', 'ADMIN', 'PARTNER', 'OPERATOR']

for role_name in roles:
    role, created = Role.objects.get_or_create(name=role_name)
    email = f"{role_name.lower()}@example.com"
    user, u_created = User.objects.get_or_create(
        email=email,
        defaults={
            'role': role,
            'password': make_password('password123'),
            'is_active': True,
            'is_email_verified': True,
            'status': 'ACTIVE',
        }
    )
    if not u_created:
        user.role = role
        user.set_password('password123')
        user.save()
    print(f"User {email} created with role {role_name}")
