import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")
django.setup()

from django.test import Client
from apps.accounts.models import User

users = User.objects.all()

client = Client()

for user in users:
    print(f"Testing dashboard for {user.email} (Role: {user.role})")
    client.force_login(user)
    
    # Test Dashboard main page
    response = client.get('/dashboard/')
    print(f"  Dashboard (GET /dashboard/): {response.status_code}")
    if response.status_code != 200:
        print(f"  Error: {response.content}")
        
    # Test HTMX endpoints used by the dashboard
    endpoints = [
        '/appointments/',
        '/chat/notifications/',
        '/billing/wallet/',
        '/chat/conversations/'
    ]
    
    for endpoint in endpoints:
        resp = client.get(endpoint)
        print(f"  Endpoint (GET {endpoint}): {resp.status_code}")
        if resp.status_code != 200:
            print(f"  Error: {resp.content}")
            
    client.logout()
    print("-" * 40)
