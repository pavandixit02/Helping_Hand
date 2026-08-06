.PHONY: help install lint test coverage run migrate makemigrations shell dbshell

help:
	@echo "Available commands:"
	@echo "  make install         Install dependencies for local development"
	@echo "  make lint            Run black, flake8, and isort"
	@echo "  make test            Run tests"
	@echo "  make coverage        Run tests with coverage"
	@echo "  make run             Run Django development server"
	@echo "  make migrate         Apply database migrations"
	@echo "  make makemigrations  Create new migrations"
	@echo "  make shell           Open Django shell plus"

install:
	pip install -r requirements/local.txt

lint:
	black .
	isort .
	flake8 .

test:
	pytest

coverage:
	pytest --cov=apps --cov=api --cov-report=html

run:
	python manage.py runserver

migrate:
	python manage.py migrate

makemigrations:
	python manage.py makemigrations

shell:
	python manage.py shell_plus
