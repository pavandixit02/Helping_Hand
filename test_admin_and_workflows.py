import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")
django.setup()

from django.test import Client
from apps.accounts.models import User

# Make admin a superuser
admin_user = User.objects.get(email="admin@example.com")
admin_user.is_staff = True
admin_user.is_superuser = True
admin_user.save()

client = Client()

# Test Django Admin
print("Testing Django Admin...")
client.force_login(admin_user)
response = client.get('/admin/')
print(f"  Admin Dashboard (GET /admin/): {response.status_code}")
if response.status_code != 200:
    print(f"  Error: {response.content}")

# Test Patient List (Customer/Profiles)
print("\nTesting Profiles / Patient List...")
response = client.get('/patients/')
print(f"  Patient List (GET /patients/): {response.status_code}")

# Test Doctors List (Partner/Profiles)
print("\nTesting Profiles / Doctors List...")
response = client.get('/patients/doctors/')
print(f"  Doctor List (GET /patients/doctors/): {response.status_code}")

# Test Communications / Conversations
print("\nTesting Conversations List...")
response = client.get('/chat/conversations/')
print(f"  Conversations (GET /chat/conversations/): {response.status_code}")

# Test Billing / Wallet
print("\nTesting Billing Wallet...")
response = client.get('/billing/wallet/')
print(f"  Wallet (GET /billing/wallet/): {response.status_code}")

client.logout()
print("-" * 40)
