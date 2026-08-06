<div align="center">
  <img src="https://via.placeholder.com/150x150/0984e3/ffffff?text=HH" alt="Helping Hand Logo" width="120" height="120" style="border-radius: 20px;" />

  <h1>🏥 Helping Hand</h1>

  <p><b>An AI-Powered Digital Healthcare & Caregiving Ecosystem</b></p>
  <p><i>Built with Python · Django · HTMX · HTML · CSS</i></p>
  <p>Connecting Patients, Caregivers, Medical Professionals, Hospitals, Ambulances, Pharmacies, Diagnostic Labs, NGOs, Insurance Providers, and Emergency Responders on a single, intelligent, secure, and scalable platform.</p>

  <br />

  <p>
    <img src="https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
    <img src="https://img.shields.io/badge/Django-5.x-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django" />
    <img src="https://img.shields.io/badge/HTMX-2.x-3366CC?style=for-the-badge&logo=htmx&logoColor=white" alt="HTMX" />
    <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Redis-7-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  </p>

  <p>
    <img src="https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge" alt="Status" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=open-source-initiative" alt="License" />
    <img src="https://img.shields.io/badge/Version-1.0.0-orange?style=for-the-badge" alt="Version" />
    <img src="https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge&logo=githubactions" alt="Build" />
    <img src="https://img.shields.io/badge/Stars-Welcome-yellow?style=for-the-badge&logo=github" alt="Stars" />
    <img src="https://img.shields.io/badge/Contributors-Active-ff69b4?style=for-the-badge&logo=git" alt="Contributors" />
  </p>
</div>

<br />

> [!NOTE]
> **Helping_Hand** is an enterprise-grade healthcare ecosystem inspired by the architecture of products like ERPNext, OpenMRS, and Odoo. Built entirely in **Python and Django**, it leverages **HTMX** for dynamic, modern user experiences without a single line of JavaScript. This repository houses the complete codebase — designed for large-scale healthcare operations, telemedicine, and emergency dispatch.

---

## 📑 Table of Contents

<details>
<summary><b>Click to expand full navigation</b></summary>

- [🌌 Vision](#-vision)
- [❓ Why Helping Hand?](#-why-helping-hand)
- [✨ Features](#-features)
  - [👤 Patient Platform](#-patient-platform)
  - [🫂 Caregiver Platform](#-caregiver-platform)
  - [🏥 Hospital Platform](#-hospital-platform)
  - [👨‍⚕️ Doctor Platform](#-doctor-platform)
  - [💊 Pharmacy Platform](#-pharmacy-platform)
  - [🔬 Laboratory Platform](#-laboratory-platform)
  - [🚑 Ambulance Platform](#-ambulance-platform)
  - [🤝 NGO Platform](#-ngo-platform)
  - [🛡️ Insurance Platform](#-insurance-platform)
  - [🆘 Emergency SOS](#-emergency-sos)
  - [🤖 AI Assistant](#-ai-assistant)
  - [📊 Admin Dashboard](#-admin-dashboard)
  - [📈 Analytics](#-analytics)
  - [💰 Finance](#-finance)
  - [🛒 Marketplace](#-marketplace)
  - [🔔 Notifications](#-notifications)
  - [📹 Telemedicine](#-telemedicine)
  - [💬 Real-Time Communication](#-real-time-communication)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [📐 System Architecture](#-system-architecture)
- [👥 User Roles](#-user-roles)
- [🚀 Installation](#-installation)
- [🔐 Environment Variables](#-environment-variables)
- [📚 API Documentation](#-api-documentation)
- [🗄️ Database Overview](#️-database-overview)
- [🔑 Authentication Flow](#-authentication-flow)
- [🛡️ RBAC Permissions](#️-rbac-permissions)
- [📦 Project Modules](#-project-modules)
- [📸 Screenshots](#-screenshots)
- [🗺️ Roadmap](#️-roadmap)
- [🔒 Security](#-security)
- [⚡ Performance](#-performance)
- [📈 Scalability](#-scalability)
- [🔄 CI/CD](#-cicd)
- [🐳 Docker](#-docker)
- [🌐 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [📝 Coding Standards](#-coding-standards)
- [🤝 Contributing Guide](#-contributing-guide)
- [❓ FAQ](#-faq)
- [🛠 Troubleshooting](#-troubleshooting)
- [📄 License](#-license)
- [📫 Contact](#-contact)
- [🔮 Future Vision](#-future-vision)

</details>

---

## 🌌 Vision

**Helping_Hand** was built with a singular, ambitious goal: **to democratize and unify healthcare operations globally.**

Healthcare ecosystems are traditionally siloed — hospitals use one system, pharmacies another, and caregivers are left juggling disparate tools with no cohesion. Helping_Hand bridges this gap by creating an integrated, secure, and intelligent platform where every stakeholder in the care chain — from the Patient pressing an SOS button to the Doctor reviewing an AI-generated triage report — collaborates in real-time on a single, unified system.

We chose **Django** because healthcare demands reliability, security, and battle-tested foundations — not hype cycles. Django's "batteries included" philosophy, its mature ORM, its built-in admin, and its proven track record in production (Instagram, Disqus, Mozilla) make it the definitive choice for mission-critical healthcare software.

We chose **HTMX** because modern, responsive UIs should not require shipping megabytes of client-side frameworks. With HTMX, we deliver instant, dynamic experiences — live search, real-time dashboards, inline editing — all rendered server-side by Django templates, with zero build steps and zero JavaScript complexity.

---

## ❓ Why Helping Hand?

| Challenge | How Helping_Hand Solves It |
|-----------|----------------------------|
| **Fragmented Systems** | One platform for patients, doctors, hospitals, pharmacies, labs, ambulances, and NGOs. |
| **JavaScript Fatigue** | Pure Python backend with HTMX-driven dynamic UI — no Node.js, no bundlers, no transpilers. |
| **Enterprise Scale** | Domain-driven Django apps, Celery task queues, Redis caching, and PostgreSQL reliability. |
| **AI Integration** | Built-in predictive triage, smart scheduling, medical document OCR, and conversational health assistants — all in Python. |
| **Uncompromising Security** | HIPAA-aligned architecture, AES-256 encryption, Django's battle-tested security middleware, and granular RBAC. |
| **Open Source Power** | Self-hostable, auditable, extensible. No vendor lock-in. MIT licensed. |

---

## ✨ Features

The ecosystem is partitioned into purpose-built platforms for every stakeholder.

### 👤 Patient Platform
- Secure medical records vault (EMR/EHR) with encrypted storage.
- Appointment booking with real-time availability via HTMX partial updates.
- Prescription tracking and automated refill requests.
- Vitals monitoring dashboard with historical charting.
- Family member and dependent management.

### 🫂 Caregiver Platform
- Real-time patient vitals dashboard with HTMX live polling.
- Task management — medication administration, therapy tracking, wound care logs.
- Direct messaging with assigned doctors.
- Shift scheduling and handoff reports.

### 🏥 Hospital Platform
- Complete Hospital Management System (HMS).
- Ward, bed allocation, and occupancy heatmaps.
- Staff rostering, shift management, and payroll integration.
- Asset and inventory tracking with low-stock Celery alerts.
- Department-level analytics and KPI dashboards.

### 👨‍⚕️ Doctor Platform
- Integrated electronic prescriptions (eRx) with drug interaction warnings.
- Patient history timeline with AI-generated diagnostic suggestions.
- Multi-party telemedicine consultations via Django Channels.
- Referral management across hospitals and specialists.

### 💊 Pharmacy Platform
- Real-time inventory synchronization across branches.
- Automated stock alerts and procurement workflows (Celery).
- Prescription verification with barcode/QR scanning.
- Delivery routing and order tracking.

### 🔬 Laboratory Platform
- LIS (Laboratory Information System) integration.
- Secure digital report delivery to patients and doctors.
- Home sample collection scheduling and technician dispatch.
- Quality control and calibration tracking.

### 🚑 Ambulance Platform
- Fleet management with real-time GPS tracking.
- Automated nearest-unit dispatch using PostGIS geospatial queries.
- EMT to emergency room real-time communication via Django Channels.
- Trip logging, fuel tracking, and maintenance schedules.

### 🤝 NGO Platform
- Campaign and blood drive management.
- Fund distribution and patient sponsorship workflows.
- Volunteer coordination and attendance tracking.
- Impact reporting and donor dashboards.

### 🛡️ Insurance Platform
- Automated claim verification and processing pipelines.
- Policy integration and eligibility checks.
- Pre-authorization workflows for procedures.
- Fraud detection flagging via rule engine.

### 🆘 Emergency SOS
- 1-click SOS triggering with automatic GPS capture.
- Automated dispatch routing to nearest available ambulance.
- Critical medical profile broadcast to responding EMTs.
- Real-time status updates to patient's emergency contacts.

### 🤖 AI Assistant
- 24/7 symptom checker and intelligent triage routing.
- OCR for digitizing legacy paper records (Python + Tesseract).
- Conversational querying of medical history (for authorized users).
- Drug interaction analysis and dosage validation.

### 📊 Admin Dashboard
- Global platform health metrics and system status.
- User management, role assignment, and audit logs.
- Content management for announcements and policies.
- Feature flags and system configuration.

### 📈 Analytics
- Hospital-level and platform-wide trend analysis.
- Patient flow analytics (admissions, discharges, readmissions).
- Financial performance dashboards.
- Custom report builder with CSV/PDF export.

### 💰 Finance
- Unified billing for consultations, lab tests, and medicines.
- Razorpay / Stripe integration for online payments.
- Insurance claim settlement tracking.
- Revenue cycle management and aging reports.

### 🛒 Marketplace
- Multi-vendor medical supplies marketplace.
- Product listings with ratings and reviews.
- Order management and fulfillment tracking.
- Vendor onboarding and commission management.

### 🔔 Notifications
- Multi-channel alerts: in-app, email, SMS (via Twilio/MSG91).
- HTMX-powered live notification badge updates.
- Configurable notification preferences per user.
- Scheduled reminder system via Celery Beat.

### 📹 Telemedicine
- Video consultations powered by Django Channels + WebRTC signaling.
- Waiting room queue management.
- In-consultation prescription and note-taking.
- Session recording (with consent) and archival.

### 💬 Real-Time Communication
- Secure, encrypted in-app messaging via Django Channels WebSockets.
- Group chats for care teams.
- File and image sharing within conversations.
- Typing indicators and read receipts via HTMX + WebSockets.

---

## 🛠️ Tech Stack

Built entirely on **Python** and its ecosystem — no JavaScript frameworks, no Node.js, no bundlers.

### Core Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Language** | Python 3.12+ | Core application language across the entire stack. |
| **Framework** | Django 5.x | Full-stack web framework — views, ORM, admin, auth, middleware. |
| **Dynamic UI** | HTMX 2.x | Server-driven interactivity — partial page updates, live search, modals, infinite scroll. |
| **Templates** | Django Templates + HTML5 | Server-side rendering with template inheritance and reusable components. |
| **Styling** | CSS3 + Custom Design System | Hand-crafted, responsive styles — no CSS frameworks required. |

### Data Layer

| Category | Technology | Purpose |
|----------|------------|---------|
| **Database** | PostgreSQL 16 | Primary relational store — ACID compliance, JSONB, and full-text search. |
| **Geospatial** | PostGIS | Geospatial queries for ambulance dispatch and proximity search. |
| **ORM** | Django ORM | Pythonic, type-hinted database access with migrations. |
| **Caching** | Redis 7 | Session storage, cache backend, Celery broker, and pub/sub messaging. |
| **Search** | PostgreSQL FTS / django-watson | Full-text search across patients, records, and inventory. |

### Infrastructure

| Category | Technology | Purpose |
|----------|------------|---------|
| **Task Queue** | Celery + Celery Beat | Async jobs — email dispatch, report generation, scheduled alerts. |
| **WebSockets** | Django Channels + Daphne | Real-time chat, notifications, and telemedicine signaling. |
| **API** | Django REST Framework | RESTful API layer for mobile apps and third-party integrations. |
| **Auth** | django-allauth + Django Auth | Multi-factor authentication, OAuth2, and social login. |
| **Payments** | Stripe / Razorpay (Python SDKs) | Secure payment processing, subscriptions, and payouts. |

### AI & Intelligence

| Category | Technology | Purpose |
|----------|------------|---------|
| **LLM Integration** | OpenAI Python SDK / LangChain | Symptom triage, medical summarization, and conversational AI. |
| **OCR** | Tesseract + pytesseract | Digitizing legacy paper medical records. |
| **Data Science** | Pandas / NumPy / scikit-learn | Analytics, trend prediction, and readmission risk models. |

### DevOps & Deployment

| Category | Technology | Purpose |
|----------|------------|---------|
| **Containerization** | Docker + Docker Compose | Reproducible development and production environments. |
| **Orchestration** | Kubernetes (K8s) | Production container orchestration and auto-scaling. |
| **IaC** | Terraform | Infrastructure as Code for AWS/GCP deployments. |
| **CI/CD** | GitHub Actions | Automated testing, linting, and deployment pipelines. |
| **Web Server** | Gunicorn + Nginx | Production WSGI serving with reverse proxy and static file serving. |
| **ASGI Server** | Daphne / Uvicorn | Async protocol server for WebSocket connections. |

### Monitoring & Observability

| Category | Technology | Purpose |
|----------|------------|---------|
| **Error Tracking** | Sentry (Python SDK) | Real-time error capture, alerting, and issue grouping. |
| **Metrics** | Prometheus + Grafana | System metrics, custom counters, and visual dashboards. |
| **Logging** | Python `logging` + ELK Stack | Structured logging with centralized log aggregation. |
| **APM** | django-silk / Datadog | Query profiling and application performance monitoring. |

---

## 📂 Project Structure

Helping_Hand follows Django best practices with a modular, app-based architecture.

```text
helping-hand/
│
├── config/                         # Project-level Django configuration
│   ├── settings/
│   │   ├── base.py                 # Shared settings across all environments
│   │   ├── development.py          # Dev-specific overrides (DEBUG=True)
│   │   ├── production.py           # Production settings (security hardening)
│   │   └── testing.py              # Test runner configuration
│   ├── urls.py                     # Root URL configuration
│   ├── wsgi.py                     # WSGI entry point (Gunicorn)
│   ├── asgi.py                     # ASGI entry point (Daphne/Uvicorn)
│   └── celery.py                   # Celery app initialization
│
├── apps/                           # Django applications (domain-driven)
│   ├── accounts/                   # User registration, profiles, authentication
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── forms.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   ├── signals.py
│   │   ├── managers.py
│   │   ├── middleware.py
│   │   ├── templates/accounts/
│   │   └── tests/
│   ├── patients/                   # Patient records, vitals, medical history
│   ├── doctors/                    # Doctor profiles, schedules, referrals
│   ├── hospitals/                  # Hospital management, wards, beds, staff
│   ├── caregivers/                 # Caregiver assignments, task management
│   ├── appointments/               # Scheduling, availability, reminders
│   ├── ehr/                        # Electronic Health Records engine
│   ├── prescriptions/              # e-Prescriptions, drug interactions
│   ├── pharmacy/                   # Inventory, orders, delivery tracking
│   ├── laboratory/                 # Lab tests, reports, sample collection
│   ├── ambulance/                  # Fleet management, dispatch, GPS tracking
│   ├── emergency/                  # SOS system, emergency contacts, dispatch
│   ├── telemedicine/               # Video consultations, waiting rooms
│   ├── chat/                       # Real-time messaging via Django Channels
│   ├── notifications/              # Multi-channel alerts (email, SMS, in-app)
│   ├── billing/                    # Invoicing, payments, insurance claims
│   ├── insurance/                  # Policy management, claim processing
│   ├── marketplace/                # Medical supplies e-commerce
│   ├── ngo/                        # NGO campaigns, volunteers, donations
│   ├── analytics/                  # Dashboards, reports, data exports
│   ├── ai_assistant/               # LLM triage, OCR, medical Q&A
│   └── dashboard/                  # Admin and role-based control panels
│
├── templates/                      # Global Django templates
│   ├── base.html                   # Master layout (HTMX, CSS includes)
│   ├── components/                 # Reusable HTML partials (navbar, modals, cards)
│   ├── includes/                   # HTMX partial response fragments
│   └── errors/                     # Custom 404, 500 error pages
│
├── static/                         # Static assets
│   ├── css/
│   │   ├── main.css                # Core design system
│   │   ├── components.css          # Component-specific styles
│   │   └── utilities.css           # Utility classes
│   ├── images/
│   └── vendor/
│       └── htmx.min.js             # HTMX library (single vendored file)
│
├── media/                          # User-uploaded files (avatars, documents)
│
├── api/                            # Django REST Framework API layer
│   ├── v1/
│   │   ├── serializers/
│   │   ├── views/
│   │   ├── urls.py
│   │   └── permissions.py
│   └── v2/                         # Future API version
│
├── services/                       # Business logic layer (decoupled from views)
│   ├── dispatch.py                 # Ambulance dispatch algorithms
│   ├── triage.py                   # AI triage engine
│   ├── billing.py                  # Payment processing orchestration
│   └── notifications.py            # Multi-channel notification dispatcher
│
├── utils/                          # Shared utilities
│   ├── encryption.py               # AES-256 field-level encryption helpers
│   ├── validators.py               # Custom model and form validators
│   ├── decorators.py               # Permission and rate-limit decorators
│   └── mixins.py                   # Reusable view and model mixins
│
├── devops/
│   ├── docker/
│   │   ├── Dockerfile              # Production multi-stage build
│   │   ├── Dockerfile.dev          # Development container
│   │   └── nginx.conf              # Nginx reverse proxy configuration
│   ├── terraform/                  # AWS/GCP infrastructure definitions
│   ├── k8s/                        # Kubernetes manifests
│   └── tests/
│       └── load/
│           └── locustfile.py       # Load testing with Locust (Python)
│
├── docs/                           # Extended documentation
│   ├── architecture.md
│   ├── api-guide.md
│   └── deployment.md
│
├── manage.py                       # Django management CLI
├── requirements/
│   ├── base.txt                    # Core dependencies
│   ├── development.txt             # Dev tools (debug toolbar, factory_boy)
│   ├── production.txt              # Production deps (gunicorn, sentry-sdk)
│   └── testing.txt                 # Test deps (pytest, coverage, faker)
├── docker-compose.yml              # Local development orchestration
├── docker-compose.prod.yml         # Production orchestration
├── pyproject.toml                  # Project metadata and tool configuration
├── Makefile                        # Developer convenience commands
├── .env.example                    # Environment variable template
├── .github/
│   └── workflows/
│       ├── ci.yml                  # Lint, test, coverage pipeline
│       └── deploy.yml              # Automated deployment pipeline
└── README.md
```

---

## 📐 System Architecture

> [!TIP]
> The architecture follows Django's modular app pattern, designed to evolve from a well-structured monolith to independently deployable services as scale demands. Each Django app encapsulates a bounded domain context.

### High-Level Architecture

```mermaid
graph TD
    subgraph Clients
        Browser[Web Browser<br/>HTML + HTMX + CSS]
        Mobile[Mobile App<br/>DRF API Consumer]
    end

    subgraph Edge Layer
        CDN[Cloudflare CDN / WAF]
        Nginx[Nginx Reverse Proxy]
    end

    subgraph Application Layer
        Gunicorn[Gunicorn WSGI Server<br/>Django Views + Templates]
        Daphne[Daphne ASGI Server<br/>Django Channels WebSockets]
    end

    subgraph Django Core
        Auth[accounts app<br/>Authentication + RBAC]
        EHR[ehr app<br/>Medical Records]
        Scheduling[appointments app<br/>Scheduling Engine]
        Billing[billing app<br/>Payments + Insurance]
        Emergency[emergency app<br/>SOS + Dispatch]
        AI[ai_assistant app<br/>Triage + OCR]
    end

    subgraph Data Layer
        PG[(PostgreSQL + PostGIS)]
        Redis[(Redis<br/>Cache + Broker + Sessions)]
        S3[Object Storage<br/>S3 / MinIO]
    end

    subgraph Background Workers
        Celery[Celery Workers]
        Beat[Celery Beat<br/>Scheduled Tasks]
    end

    Browser --> CDN
    Mobile --> CDN
    CDN --> Nginx

    Nginx --> Gunicorn
    Nginx --> Daphne

    Gunicorn --> Auth
    Gunicorn --> EHR
    Gunicorn --> Scheduling
    Gunicorn --> Billing
    Gunicorn --> Emergency
    Gunicorn --> AI

    Daphne --> Auth
    Daphne --> EHR

    Auth --> PG
    EHR --> PG
    Scheduling --> PG
    Billing --> PG
    Emergency --> PG
    AI --> PG

    Auth --> Redis
    EHR --> S3
    Emergency --> Redis

    Celery --> PG
    Celery --> Redis
    Beat --> Celery
```

### Request Flow — HTMX Interaction Pattern

```mermaid
sequenceDiagram
    participant B as Browser (HTMX)
    participant N as Nginx
    participant D as Django View
    participant T as Django Template
    participant DB as PostgreSQL

    B->>N: HTMX Request (hx-get / hx-post)
    N->>D: Forward to Django URL router
    D->>DB: Query via Django ORM
    DB-->>D: QuerySet result
    D->>T: Render HTML partial template
    T-->>D: HTML fragment
    D-->>N: HTTP Response (HTML fragment)
    N-->>B: HTML fragment
    B->>B: HTMX swaps fragment into DOM
```

### Emergency Dispatch Flow

```mermaid
flowchart LR
    SOS[Patient SOS Trigger] --> GEO[Capture GPS Coordinates]
    GEO --> POSTGIS[PostGIS Nearest Query]
    POSTGIS --> DISPATCH[Assign Ambulance]
    DISPATCH --> NOTIFY[Notify EMT via Channels]
    NOTIFY --> TRACK[Real-time GPS Tracking]
    TRACK --> HOSPITAL[Alert Receiving ER]
```

---

## 👥 User Roles

Helping_Hand implements a hierarchical, multi-tenant role system. Each role maps to a Django Group with granular permissions.

| Role | Django Group | Access Tier | Description |
|------|-------------|-------------|-------------|
| **Super Admin** | `superadmin` | Tier 0 | Full ecosystem control — global config, user management, audit overrides. |
| **Hospital Admin** | `hospital_admin` | Tier 1 | Manages a specific hospital — facilities, staff, billing, and compliance. |
| **Doctor** | `doctor` | Tier 2 | Access to assigned patients, schedules, medical records, and prescriptions. |
| **Nurse** | `nurse` | Tier 2 | Patient vitals, medication charts, care plans, and shift notes. |
| **Caregiver** | `caregiver` | Tier 2 | Assigned patient vitals, daily task checklists, and family communication. |
| **Pharmacist** | `pharmacist` | Tier 2 | Process prescriptions, manage inventory, fulfill delivery orders. |
| **Lab Technician** | `lab_tech` | Tier 2 | Sample processing, report uploads, quality control. |
| **Emergency Responder** | `emt` | Tier 1 | View dispatched locations, critical emergency medical profiles, trip logging. |
| **Patient** | `patient` | Tier 3 | Own records, appointment booking, prescriptions, and communications. |
| **NGO Coordinator** | `ngo_coordinator` | Tier 2 | Campaign management, volunteer coordination, fund distribution. |
| **Insurance Agent** | `insurance_agent` | Tier 2 | Claim processing, policy management, pre-authorization workflows. |

---

## 🚀 Installation

### 1. Prerequisites

| Requirement | Version |
|-------------|---------|
| Python | 3.12+ |
| PostgreSQL | 16+ |
| Redis | 7+ |
| Docker & Docker Compose | Latest |
| Git | Latest |

### 2. Clone the Repository
```bash
git clone https://github.com/pavandixit02/Helping_Hand.git
cd Helping_Hand
```

### 3. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows
```

### 4. Install Dependencies
```bash
pip install -r requirements/development.txt
```

### 5. Environment Setup
```bash
cp .env.example .env
# Edit .env with your local configuration
```

### 6. Database Setup

<details>
<summary><b>Option A: Docker (Recommended)</b></summary>

Start PostgreSQL and Redis containers:
```bash
docker-compose up -d db redis
```
</details>

<details>
<summary><b>Option B: Local Installation</b></summary>

Ensure PostgreSQL and Redis are installed and running locally. Update `.env` with your connection details.
</details>

Run migrations and seed data:
```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_demo_data    # Custom management command
```

### 7. Development Server
```bash
# Start Django development server
python manage.py runserver

# In a separate terminal — start Celery worker
celery -A config worker -l info

# In a separate terminal — start Celery Beat (scheduled tasks)
celery -A config beat -l info

# In a separate terminal — start Channels (WebSockets)
daphne config.asgi:application --port 8001
```

Or use the convenience Makefile:
```bash
make run-all
```

### 8. Docker (Full Stack)
```bash
docker-compose up --build
```
This starts Django, PostgreSQL, Redis, Celery, Daphne, and Nginx in one command.

### 9. Production Deployment
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

---

## 🔐 Environment Variables

All configuration is managed through environment variables. Copy `.env.example` and customize.

| Variable | Description | Example |
|----------|-------------|---------|
| `SECRET_KEY` | Django secret key for cryptographic signing | `django-insecure-change-me-in-production` |
| `DEBUG` | Enable/disable debug mode | `True` |
| `ALLOWED_HOSTS` | Comma-separated list of allowed hostnames | `localhost,127.0.0.1` |
| `DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@localhost:5432/helping_hand` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379/0` |
| `CELERY_BROKER_URL` | Celery message broker URL | `redis://localhost:6379/1` |
| `EMAIL_HOST` | SMTP server for sending emails | `smtp.gmail.com` |
| `EMAIL_HOST_USER` | SMTP username | `noreply@helpinghand.com` |
| `EMAIL_HOST_PASSWORD` | SMTP password | `app-specific-password` |
| `STRIPE_SECRET_KEY` | Stripe payment gateway secret key | `sk_test_...` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for client-side | `pk_test_...` |
| `AWS_S3_BUCKET` | S3 bucket for medical file storage | `hh-medical-storage-dev` |
| `AWS_ACCESS_KEY_ID` | AWS access key | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | `wJalr...` |
| `OPENAI_API_KEY` | OpenAI API key for AI features | `sk-...` |
| `TWILIO_ACCOUNT_SID` | Twilio SID for SMS notifications | `AC...` |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | `your_auth_token` |
| `SENTRY_DSN` | Sentry error tracking DSN | `https://examplePublicKey@sentry.io/1` |

---

## 📚 API Documentation

Helping_Hand exposes a RESTful API via **Django REST Framework** for mobile clients and third-party integrations.

- **Base URL:** `https://api.helpinghand.com/api/v1/`
- **Documentation:** Auto-generated Swagger UI at `/api/docs/` and ReDoc at `/api/redoc/` (powered by `drf-spectacular`).
- **Versioning:** URI-based (`/api/v1/`, `/api/v2/`) managed via DRF's `URLPathVersioning`.
- **Authentication:** Token-based (DRF TokenAuth) and session-based for web views.
- **Throttling:** Configurable rate limits via DRF throttle classes.

> [!NOTE]
> The web interface is primarily rendered server-side via Django Templates + HTMX. The DRF API is specifically for mobile apps and external system integrations.

> [!NOTE]
> We maintain backward compatibility for at least 12 months for any deprecated API endpoint. Deprecation headers are included in responses during the sunset period.

---

## 🗄️ Database Overview

Helping_Hand uses **PostgreSQL** as its primary data store, managed entirely via **Django ORM** models with full migration history.

### Core Entities

```mermaid
erDiagram
    User ||--o{ Profile : has
    User ||--o{ Appointment : books
    User {
        int id PK
        string email
        string password_hash
        string role
        bool is_active
        datetime created_at
    }

    Profile {
        int id PK
        int user_id FK
        string phone
        string blood_group
        json emergency_contacts
        string address
    }

    Appointment ||--|| Doctor : assigned_to
    Appointment ||--|| Patient : booked_by
    Appointment {
        int id PK
        int patient_id FK
        int doctor_id FK
        datetime scheduled_at
        string status
        string visit_type
    }

    MedicalRecord ||--|| Patient : belongs_to
    MedicalRecord {
        int id PK
        int patient_id FK
        json encrypted_data
        string record_type
        datetime created_at
        int created_by FK
    }

    Prescription ||--|| Appointment : from
    Prescription {
        int id PK
        int appointment_id FK
        json medications
        string notes
        datetime valid_until
    }

    Inventory ||--|| Pharmacy : stocked_at
    Inventory {
        int id PK
        int pharmacy_id FK
        string item_name
        int quantity
        datetime expiry_date
    }
```

### Key Design Decisions
- **Multi-table inheritance** for role-specific profiles (PatientProfile, DoctorProfile) linked to a single `User` model.
- **JSONB fields** for flexible medical data (vitals, lab results) with PostgreSQL indexing.
- **PostGIS** extension for geospatial queries (ambulance dispatch, nearest pharmacy).
- **Encrypted fields** for all PHI/PII using `django-encrypted-model-fields`.
- **Soft deletes** on all clinical data — medical records are never hard-deleted.

---

## 🔑 Authentication Flow

Helping_Hand uses **django-allauth** for identity management with Django's built-in session framework.

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant D as Django View
    participant A as django-allauth
    participant DB as PostgreSQL
    participant R as Redis (Sessions)

    U->>D: POST /accounts/login/ (email + password)
    D->>A: Authenticate credentials
    A->>DB: Validate user record
    DB-->>A: User object
    A->>A: Check MFA (if enabled)
    A-->>D: Authentication success
    D->>R: Create session (session_id)
    D-->>U: Set-Cookie: sessionid=xxx (HttpOnly, Secure, SameSite)
    U->>D: Subsequent requests include session cookie
    D->>R: Validate session
    R-->>D: User context loaded
```

### Supported Authentication Methods
- Email + Password (with bcrypt hashing via Django's PBKDF2).
- OAuth2 Social Login (Google, GitHub) via django-allauth providers.
- Multi-Factor Authentication (TOTP) via django-otp.
- Password reset via secure, time-limited email tokens.

---

## 🛡️ RBAC Permissions

Permissions are resolved via Django's built-in permission framework, extended with custom decorators and middleware.

### Permission Architecture

| Layer | Mechanism | Description |
|-------|-----------|-------------|
| **Model-Level** | Django `Meta.permissions` | Fine-grained permissions per model (e.g., `can_view_patient_records`). |
| **View-Level** | `@permission_required` / `PermissionRequiredMixin` | Declarative access control on views. |
| **Object-Level** | `django-guardian` | Row-level permissions (e.g., Doctor X can only see their own patients). |
| **Template-Level** | `{% if perms.ehr.can_view_records %}` | Conditional rendering of UI elements based on permissions. |
| **API-Level** | DRF `permissions.py` | Custom permission classes for API endpoints. |

### Resolution Flow
1. Request arrives → Django middleware loads User from session (Redis).
2. View checks `permission_required` against User's Groups and Permissions.
3. For object-level access, `django-guardian` checks per-object permissions.
4. Templates conditionally render UI elements based on `perms` context.

---

## 📦 Project Modules

Each Django app is a self-contained module with its own models, views, templates, forms, and tests.

<details>
<summary><b>📋 Click to expand all modules</b></summary>

| Module (Django App) | Description | Key Models |
|---------------------|-------------|------------|
| `accounts` | User registration, login, profile management, role assignment. | `User`, `Profile`, `Role` |
| `patients` | Patient-specific views, medical history, family management. | `PatientProfile`, `FamilyMember` |
| `doctors` | Doctor profiles, qualifications, consultation settings. | `DoctorProfile`, `Specialization` |
| `hospitals` | Hospital registration, departments, wards, beds, staff. | `Hospital`, `Ward`, `Bed`, `Department` |
| `caregivers` | Caregiver assignments, task lists, shift management. | `CaregiverProfile`, `CareTask` |
| `appointments` | Scheduling engine, availability slots, reminders. | `Appointment`, `AvailabilitySlot` |
| `ehr` | Core EHR engine — medical records, vitals, diagnoses. | `MedicalRecord`, `VitalSign`, `Diagnosis` |
| `prescriptions` | Electronic prescriptions, drug database, interaction checks. | `Prescription`, `Medication`, `DrugInteraction` |
| `pharmacy` | Inventory management, order fulfillment, delivery tracking. | `PharmacyBranch`, `InventoryItem`, `Order` |
| `laboratory` | Lab test catalog, sample collection, report management. | `LabTest`, `SampleCollection`, `LabReport` |
| `ambulance` | Fleet management, GPS tracking, dispatch engine. | `Ambulance`, `DispatchRecord`, `Trip` |
| `emergency` | SOS triggers, emergency contacts, automated dispatch. | `SOSAlert`, `EmergencyContact` |
| `telemedicine` | Video consultation management, waiting rooms. | `Consultation`, `WaitingRoom` |
| `chat` | Real-time messaging via Django Channels. | `Conversation`, `Message` |
| `notifications` | Multi-channel notification engine. | `Notification`, `NotificationPreference` |
| `billing` | Invoicing, payment processing, insurance claims. | `Invoice`, `Payment`, `InsuranceClaim` |
| `insurance` | Policy management, eligibility, pre-authorization. | `InsurancePolicy`, `PreAuth` |
| `marketplace` | Medical supplies marketplace, vendor management. | `Product`, `Vendor`, `MarketplaceOrder` |
| `ngo` | NGO campaigns, volunteer management, donations. | `Campaign`, `Volunteer`, `Donation` |
| `analytics` | Dashboards, report generation, data exports. | `Report`, `Dashboard`, `ExportJob` |
| `ai_assistant` | AI-powered features — triage, OCR, medical Q&A. | `TriageSession`, `OCRResult` |
| `dashboard` | Role-based control panels and system admin. | Aggregate views — no dedicated models. |

</details>

---

## 📸 Screenshots

| Admin Dashboard | Patient Portal | Telemedicine |
|:---:|:---:|:---:|
| <img src="https://via.placeholder.com/600x400/1a1a2e/e94560?text=Admin+Dashboard" alt="Admin Dashboard" width="300" /> | <img src="https://via.placeholder.com/600x400/16213e/0f3460?text=Patient+Portal" alt="Patient Portal" width="300" /> | <img src="https://via.placeholder.com/600x400/1a1a2e/533483?text=Telemedicine" alt="Telemedicine" width="300" /> |
| *Unified Admin Control Center* | *Patient Health Dashboard* | *Doctor-Patient Video Consult* |

| Emergency SOS | Pharmacy Inventory | Analytics |
|:---:|:---:|:---:|
| <img src="https://via.placeholder.com/600x400/1a1a2e/e23e57?text=Emergency+SOS" alt="Emergency SOS" width="300" /> | <img src="https://via.placeholder.com/600x400/1a1a2e/2ecc71?text=Pharmacy+Inventory" alt="Pharmacy" width="300" /> | <img src="https://via.placeholder.com/600x400/1a1a2e/3498db?text=Analytics+Dashboard" alt="Analytics" width="300" /> |
| *1-Click Emergency Dispatch* | *Real-Time Stock Management* | *Platform-Wide Analytics* |

---

## 🗺️ Roadmap

```mermaid
gantt
    title Helping_Hand Development Roadmap
    dateFormat  YYYY-MM
    axisFormat  %b %Y
    
    section Wave 1 - Core
    Authentication & User Management    :done, w1a, 2025-01, 2025-03
    Patient & Doctor Profiles           :done, w1b, 2025-02, 2025-04
    Appointment Scheduling              :done, w1c, 2025-03, 2025-05
    Basic HTMX Dashboard                :done, w1d, 2025-04, 2025-06

    section Wave 2 - Clinical
    EHR & Medical Records               :active, w2a, 2025-06, 2025-09
    e-Prescriptions                     :active, w2b, 2025-07, 2025-09
    Telemedicine (Django Channels)      :w2c, 2025-08, 2025-11
    Laboratory Integration              :w2d, 2025-09, 2025-11

    section Wave 3 - Enterprise
    Hospital Management System          :w3a, 2025-11, 2026-02
    Pharmacy & Inventory                :w3b, 2025-12, 2026-03
    Billing & Insurance                 :w3c, 2026-01, 2026-04
    Marketplace                         :w3d, 2026-02, 2026-05

    section Wave 4 - Intelligence
    AI Symptom Triage                   :w4a, 2026-05, 2026-08
    Medical OCR                         :w4b, 2026-06, 2026-08
    Predictive Analytics                :w4c, 2026-07, 2026-10
    Readmission Risk Models             :w4d, 2026-08, 2026-10

    section Wave 5 - Global
    Emergency SOS & Dispatch            :w5a, 2026-10, 2027-01
    IoT Wearable Integration            :w5b, 2026-11, 2027-02
    Multi-Language Support              :w5c, 2027-01, 2027-03
    National Health Grid Integration    :w5d, 2027-02, 2027-06
```

### Wave Breakdown

<details>
<summary><b>🌊 Wave 1: Core Foundation (Completed)</b></summary>

- Custom User model with multi-role support.
- django-allauth integration (email + social login).
- Patient and Doctor profile management.
- HTMX-driven appointment booking with real-time slot updates.
- Base template system with responsive CSS design.
</details>

<details>
<summary><b>🌊 Wave 2: Clinical Systems (In Progress)</b></summary>

- Full EHR engine with encrypted medical records.
- Electronic prescription system with drug interaction database.
- Telemedicine via Django Channels WebRTC signaling.
- Laboratory test ordering and digital report delivery.
</details>

<details>
<summary><b>🌊 Wave 3: Enterprise & B2B</b></summary>

- Hospital Management System (wards, beds, staff rostering).
- Pharmacy inventory with automated procurement alerts.
- Unified billing engine with Stripe/Razorpay integration.
- Multi-vendor medical supplies marketplace.
</details>

<details>
<summary><b>🌊 Wave 4: AI & Intelligence</b></summary>

- AI-powered symptom triage using OpenAI/LangChain.
- Tesseract OCR for digitizing paper medical records.
- Predictive analytics dashboards (readmission risk, patient flow).
- Automated coding suggestions for diagnoses (ICD-10).
</details>

<details>
<summary><b>🌊 Wave 5: Global Scale</b></summary>

- 1-click Emergency SOS with PostGIS-powered ambulance dispatch.
- Wearable integration (Apple HealthKit, Google Fit data ingestion).
- Django i18n for multi-language support.
- APIs for national health grid interoperability (HL7 FHIR).
</details>

---

## 🔒 Security

Security is non-negotiable in healthcare software. Helping_Hand is built with defense-in-depth.

| Layer | Protection | Implementation |
|-------|------------|----------------|
| **Data at Rest** | AES-256 encryption for all PII/PHI | `django-encrypted-model-fields` |
| **Data in Transit** | TLS 1.3 enforcement | Nginx SSL termination + HSTS headers |
| **Authentication** | Brute-force protection | Django's login throttling + django-axes |
| **CSRF** | Cross-Site Request Forgery prevention | Django's built-in CSRF middleware |
| **XSS** | Cross-Site Scripting prevention | Django template auto-escaping |
| **SQL Injection** | Parameterized queries | Django ORM (no raw SQL in app code) |
| **Clickjacking** | Frame prevention | `X-Frame-Options: DENY` middleware |
| **Sessions** | Secure session handling | HttpOnly, Secure, SameSite cookies in Redis |
| **Audit Trail** | Immutable logging of all PHI access | `django-auditlog` on all clinical models |
| **Rate Limiting** | API abuse prevention | `django-ratelimit` + Redis-backed throttling |
| **HIPAA/GDPR** | Regulatory alignment | Architecture follows HIPAA Security Rule controls |

> [!CAUTION]
> **Responsible Disclosure**: If you discover a security vulnerability, do **NOT** open a public issue. Please email `security@helpinghand.com` immediately. We will acknowledge within 24 hours and patch within 72 hours for critical issues.

---

## ⚡ Performance

- **Server-Side Rendering**: Django templates render HTML on the server — no client-side hydration overhead.
- **HTMX Partial Updates**: Only the changed DOM fragment is re-rendered and swapped — minimal bandwidth.
- **Database Indexing**: B-Tree, GIN, and GiST indexes on frequently queried fields.
- **Connection Pooling**: `django-db-connection-pool` or PgBouncer for connection reuse.
- **Redis Caching**: `django.core.cache` with Redis backend for session, view, and query caching.
- **Async Tasks**: All I/O-heavy operations (emails, reports, OCR) offloaded to Celery workers.
- **Static Asset Serving**: Nginx serves static/media files with aggressive cache headers.
- **Query Optimization**: `django-silk` for profiling N+1 queries during development.

---

## 📈 Scalability

Helping_Hand is stateless at the application layer, enabling horizontal scaling.

```mermaid
graph LR
    LB[Load Balancer<br/>Nginx / ALB] --> G1[Gunicorn Worker 1]
    LB --> G2[Gunicorn Worker 2]
    LB --> G3[Gunicorn Worker N]

    G1 --> PG_Primary[(PostgreSQL Primary)]
    G2 --> PG_Primary
    G3 --> PG_Primary

    PG_Primary --> PG_Replica[(Read Replica 1)]
    PG_Primary --> PG_Replica2[(Read Replica 2)]

    G1 --> Redis_Cluster[(Redis Cluster)]
    G2 --> Redis_Cluster
    G3 --> Redis_Cluster

    CW1[Celery Worker 1] --> Redis_Cluster
    CW2[Celery Worker N] --> Redis_Cluster
    CW1 --> PG_Primary
    CW2 --> PG_Primary
```

- **Gunicorn Workers**: Scale horizontally behind a load balancer.
- **Read Replicas**: Separate PostgreSQL replicas for analytics and reporting queries.
- **Celery Workers**: Independently scalable background task processors.
- **Redis Cluster**: Distributed caching and session storage.
- **Kubernetes**: K8s manifests provided in `devops/k8s/` for container orchestration.

---

## 🔄 CI/CD

Automated via **GitHub Actions** (`.github/workflows/`).

| Stage | Tool | Description |
|-------|------|-------------|
| **Lint** | `flake8` + `black` + `isort` | Code style and import order enforcement. |
| **Type Check** | `mypy` | Static type analysis across the codebase. |
| **Unit Tests** | `pytest` + `pytest-django` | Model, view, and service layer tests. |
| **Integration Tests** | `pytest` + `factory_boy` | Cross-app workflow tests with fixtures. |
| **Coverage** | `pytest-cov` | Minimum 80% coverage gate. |
| **Security Scan** | `bandit` + `safety` | Static security analysis and dependency audit. |
| **Build** | Docker | Multi-stage image build and push to registry. |
| **Deploy** | ArgoCD / SSH | Automated deployment to staging and production. |

---

## 🐳 Docker

The entire ecosystem is containerized for consistent development and production environments.

### Development
```bash
docker-compose up --build
```
This starts: Django (Gunicorn), Daphne (WebSockets), PostgreSQL, Redis, Celery Worker, and Celery Beat.

### Production
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```
Production adds: Nginx reverse proxy, SSL termination, and optimized multi-stage builds.

### Container Architecture

| Container | Image Base | Port | Purpose |
|-----------|-----------|------|---------|
| `web` | `python:3.12-slim` | 8000 | Django via Gunicorn |
| `channels` | `python:3.12-slim` | 8001 | Django Channels via Daphne |
| `db` | `postgis/postgis:16` | 5432 | PostgreSQL + PostGIS |
| `redis` | `redis:7-alpine` | 6379 | Cache, sessions, Celery broker |
| `celery_worker` | `python:3.12-slim` | — | Background task processing |
| `celery_beat` | `python:3.12-slim` | — | Scheduled task scheduler |
| `nginx` | `nginx:alpine` | 80/443 | Reverse proxy + static files |

---

## 🌐 Deployment

### Infrastructure as Code (Terraform)
We provide Terraform modules in `devops/terraform/` for cloud deployments.

```bash
cd devops/terraform
terraform init
terraform plan
terraform apply
```

### Supported Deployment Targets

| Target | Method | Notes |
|--------|--------|-------|
| **AWS** | Terraform (ECS/EKS, RDS, ElastiCache, S3) | Full production setup |
| **DigitalOcean** | Docker Compose on Droplet | Budget-friendly option |
| **Self-Hosted** | Docker Compose + Nginx | Full control, on-premise |
| **Railway / Render** | Direct Git push | Quick staging environments |

---

## 🧪 Testing

We mandate high test coverage for core medical and financial logic.

| Type | Tool | Scope |
|------|------|-------|
| **Unit** | `pytest` + `pytest-django` | Models, services, utilities |
| **Integration** | `pytest` + `factory_boy` | Cross-app workflows, API endpoints |
| **E2E** | `Selenium` + `pytest-selenium` | Full browser-based user flows |
| **Load** | `Locust` | API stress testing (see `devops/tests/load/locustfile.py`) |
| **Security** | `bandit` + `safety` | Static analysis and dependency audits |

### Running Tests
```bash
# Run all tests
python manage.py test

# Run with pytest (recommended)
pytest

# Run with coverage report
pytest --cov=apps --cov-report=html

# Run specific app tests
pytest apps/ehr/tests/

# Run load tests
cd devops/tests/load
locust -f locustfile.py
```

---

## 📝 Coding Standards

| Standard | Tool | Configuration |
|----------|------|---------------|
| **Code Formatter** | `black` | `pyproject.toml` — line length 88 |
| **Import Sorting** | `isort` | `pyproject.toml` — Django profile |
| **Linter** | `flake8` | `.flake8` — max line length 88 |
| **Type Checking** | `mypy` | `pyproject.toml` — strict mode |
| **Pre-commit Hooks** | `pre-commit` | `.pre-commit-config.yaml` — auto-enforced |
| **Commit Messages** | Conventional Commits | `feat:`, `fix:`, `chore:`, `docs:` |
| **Docstrings** | Google style | All public functions and classes |

---

## 🤝 Contributing Guide

We welcome contributions from developers, designers, healthcare professionals, and medical domain experts globally!

### Getting Started
1. **Fork** the repository.
2. **Create** your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Write tests** for your changes.
4. **Run the full test suite** to ensure nothing is broken:
   ```bash
   pytest
   ```
5. **Commit** using Conventional Commits:
   ```bash
   git commit -m "feat(ehr): add vitals charting endpoint"
   ```
6. **Push** and open a Pull Request.

### Contribution Areas
- 🐛 **Bug Reports** — Open an issue with reproduction steps.
- ✨ **Feature Requests** — Discuss in GitHub Discussions first.
- 📖 **Documentation** — Improve guides, add examples.
- 🌍 **Translations** — Help us support more languages via Django i18n.
- 🏥 **Domain Expertise** — Medical professionals can review clinical workflows.

---

## ❓ FAQ

<details>
<summary><b>Is Helping_Hand free to use?</b></summary>
Yes. The core platform is MIT licensed and completely open-source. We plan to offer optional managed cloud hosting in the future.
</details>

<details>
<summary><b>Why Django instead of a modern JavaScript framework?</b></summary>
Django is battle-tested in production at Instagram, Disqus, and Mozilla. Healthcare software demands stability, security, and a mature ecosystem — not framework churn. Combined with HTMX, we deliver modern, dynamic UIs with the reliability of server-side rendering and zero JavaScript build complexity.
</details>

<details>
<summary><b>Why HTMX instead of React/Vue?</b></summary>
HTMX lets us build highly interactive UIs (live search, inline editing, real-time updates) by returning HTML fragments from Django views. This means: no JSON serialization overhead, no client-side state management, no build toolchain, and the full power of Django's template engine. The result is a simpler, faster, and more maintainable codebase.
</details>

<details>
<summary><b>Can I use this for a real hospital today?</b></summary>
We are in active development. Please evaluate the codebase carefully against your local regulatory standards (HIPAA, GDPR, local health authority requirements) before deploying in a production medical environment. We recommend engaging a compliance consultant.
</details>

<details>
<summary><b>How do I integrate existing hospital hardware or IoT devices?</b></summary>
You can build custom Django management commands or Celery tasks that ingest data from your hardware via our REST API (Django REST Framework). See the API documentation at <code>/api/docs/</code>.
</details>

<details>
<summary><b>Can I deploy this on-premise?</b></summary>
Absolutely. Helping_Hand is designed to be self-hosted. Use the provided Docker Compose files for a fully containerized on-premise deployment. No external cloud dependencies are required for core functionality.
</details>

---

## 🛠 Troubleshooting

<details>
<summary><b>Database connection errors</b></summary>

- Ensure PostgreSQL is running: `docker-compose ps` or `systemctl status postgresql`.
- Verify `DATABASE_URL` in `.env` matches your PostgreSQL credentials.
- Check that the database exists: `psql -U postgres -c "SELECT datname FROM pg_database;"`.
</details>

<details>
<summary><b>Migrations failing</b></summary>

- Run `python manage.py showmigrations` to see pending migrations.
- Try `python manage.py migrate --run-syncdb` for initial setup.
- If conflicts arise: `python manage.py makemigrations --merge`.
</details>

<details>
<summary><b>Celery workers not processing tasks</b></summary>

- Ensure Redis is running: `docker-compose ps redis` or `redis-cli ping`.
- Verify `CELERY_BROKER_URL` in `.env` points to your Redis instance.
- Check worker logs: `celery -A config worker -l debug`.
</details>

<details>
<summary><b>HTMX requests returning full pages instead of fragments</b></summary>

- Ensure your view checks for HTMX requests: `if request.htmx:` (requires `django-htmx` middleware).
- Return a partial template for HTMX requests and the full page for normal requests.
- Verify `django_htmx.middleware.HtmxMiddleware` is in your `MIDDLEWARE` setting.
</details>

<details>
<summary><b>Static files not loading</b></summary>

- Run `python manage.py collectstatic`.
- In development, ensure `django.contrib.staticfiles` is in `INSTALLED_APPS`.
- In production, verify Nginx is configured to serve the `staticfiles/` directory.
</details>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```text
MIT License

Copyright (c) 2025 Helping_Hand Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 📫 Contact

| Channel | Link |
|---------|------|
| 🌐 **Website** | [helpinghand.com](https://helpinghand.com) |
| 🐦 **Twitter** | [@HelpingHandOS](https://twitter.com/HelpingHandOS) |
| 💬 **Discord** | [Join our Community](https://discord.gg/helpinghand) |
| 📧 **Email** | contact@helpinghand.com |
| 🔒 **Security** | security@helpinghand.com |

---

## 🔮 Future Vision

In the next 5 years, Helping_Hand aims to:

- 🌍 **Integrate with national health grids** via HL7 FHIR interoperability standards.
- 🔐 **Adopt quantum-safe encryption** for future-proof medical record security.
- 🚁 **Enable autonomous drone logistics** for medical supply delivery to remote areas.
- ⌚ **Deep wearable integration** — continuous vitals streaming from smartwatches and medical IoT devices.
- 🧬 **Genomics integration** — personalized treatment recommendations based on genetic profiles.
- 🌐 **Multi-language, multi-currency** — truly global healthcare accessibility.

The mission is clear: **Healthcare without borders, powered by open source.**

---

<div align="center">

  <br />

  <p>
    <img src="https://img.shields.io/badge/Made%20with-Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
    <img src="https://img.shields.io/badge/Powered%20by-Django-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django" />
    <img src="https://img.shields.io/badge/Dynamic%20with-HTMX-3366CC?style=for-the-badge&logo=htmx&logoColor=white" alt="HTMX" />
  </p>

  <sub>Built with ❤️ by the open-source community for a healthier world.</sub>

  <br />
  <br />

  ⭐ **Star this repo if you believe in open-source healthcare!** ⭐

</div>
