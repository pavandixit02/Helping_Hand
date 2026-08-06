# Security Policy

## Supported Versions
Only the latest major version is currently supported for security updates.

## Reporting a Vulnerability
Please do not report security vulnerabilities through public GitHub issues.

Instead, please send an email to `security@helpinghand.com`. We will evaluate the report and respond within 48 hours.

## Security Architecture (Django)
This ecosystem relies heavily on Django's built-in security features, including:
- **CSRF Protection** via `CsrfViewMiddleware`
- **XSS Protection** via template auto-escaping and `SECURE_BROWSER_XSS_FILTER`
- **Clickjacking Protection** via `XFrameOptionsMiddleware`
- **SSL/HTTPS Enforcement** via `SECURE_SSL_REDIRECT` and HSTS
- **Data Encryption**: PHI/PII data is encrypted at rest using AES-256 (via `cryptography` library)
- **Authentication**: Custom User model with email verification, strict password validators, and built-in throttling for DRF endpoints.
