"""AES-256 field-level encryption helpers for PHI/PII data."""

import base64
import os

from cryptography.fernet import Fernet
from django.conf import settings


def get_encryption_key() -> bytes:
    """Derive the Fernet encryption key from Django SECRET_KEY."""
    key = settings.SECRET_KEY[:32].encode()
    return base64.urlsafe_b64encode(key.ljust(32, b"\0"))


def encrypt_value(plain_text: str) -> str:
    """Encrypt a string value using Fernet symmetric encryption."""
    f = Fernet(get_encryption_key())
    return f.encrypt(plain_text.encode()).decode()


def decrypt_value(cipher_text: str) -> str:
    """Decrypt a Fernet-encrypted string."""
    f = Fernet(get_encryption_key())
    return f.decrypt(cipher_text.encode()).decode()
