# Security Policy & OWASP Mitigation Strategy

Helping Hand is a healthcare platform processing highly sensitive Protected Health Information (PHI) and financial data. Security is our absolute highest priority.

## OWASP Top 10 Mitigation Matrix

1. **A01:2021 - Broken Access Control**
   - **Mitigation**: All API endpoints are protected by `auth.ts` middleware. We enforce strict RBAC (`requireRole`) and granular permission checks (`requirePermission`).
2. **A02:2021 - Cryptographic Failures**
   - **Mitigation**: Passwords hashed with `bcrypt` (cost 12). All medical chat messages are symmetrically encrypted using AES-256-GCM before database insertion. TLS 1.3 enforced for all transport.
3. **A03:2021 - Injection**
   - **Mitigation**: Prisma ORM strictly prevents SQL injection. Input sanitization enforced via Zod (`validate.ts`).
4. **A04:2021 - Insecure Design**
   - **Mitigation**: Adopted Domain-Driven Design (DDD) to isolate bounded contexts (e.g., Finance cannot mutate Healthcare without events). Threat modeling required for all new Epics.
5. **A05:2021 - Security Misconfiguration**
   - **Mitigation**: Docker containers run as non-root. `helmet` middleware deployed. 
6. **A06:2021 - Vulnerable and Outdated Components**
   - **Mitigation**: Automated CI/CD dependency scanning via Trivy (`trivy-scan.sh`).
7. **A07:2021 - Identification and Authentication Failures**
   - **Mitigation**: JWT tokens use short expirations (15 mins) coupled with refresh tokens. 
8. **A08:2021 - Software and Data Integrity Failures**
   - **Mitigation**: Package-lock validation. CI/CD pipeline signing.
9. **A09:2021 - Security Logging and Monitoring Failures**
   - **Mitigation**: Pino structured logging with `x-request-id` tracing. Sentry integration for real-time error alerts.
10. **A10:2021 - Server-Side Request Forgery (SSRF)**
    - **Mitigation**: Network policies (AWS VPC) strictly block internal server access from the API Gateway.

## Bug Bounty Program
If you believe you have found a security vulnerability in Helping Hand, please securely email `security@helpinghand.com`. Do NOT disclose the vulnerability publicly.
