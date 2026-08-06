# Python runtime (slim to keep image small)
FROM python:3.11-slim as python-base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1 \
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"

# Prepend poetry and venv to path
ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"

# Build dependencies
FROM python-base as builder-base
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        curl \
        build-essential \
        libpq-dev \
        gdal-bin \
        libgdal-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR $PYSETUP_PATH

# Install dependencies via pip (we use requirements for simplicity here)
COPY requirements/base.txt requirements/production.txt ./
RUN pip install --prefix=/install -r production.txt

# Final image
FROM python-base as production
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        libpq-dev \
        gdal-bin \
        libgdal-dev \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder-base /install /usr/local

WORKDIR /app

# Copy project files
COPY . .

# Run as non-root user
RUN adduser --disabled-password --no-create-home django \
    && chown -R django:django /app
USER django

# Collect static files
RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Gunicorn (WSGI) + Daphne (ASGI) could be run separately,
# but we'll use Daphne as the main entry point to support WebSockets.
CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "config.asgi:application"]
