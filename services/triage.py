"""
AI-powered symptom triage service.
"""

import logging

logger = logging.getLogger(__name__)


def analyze_symptoms(symptoms: list[str], patient_age: int, patient_gender: str) -> dict:
    """
    Use an LLM to analyze patient symptoms and generate a triage recommendation.

    Args:
        symptoms: List of reported symptoms.
        patient_age: Patient's age.
        patient_gender: Patient's gender.

    Returns:
        Dictionary with triage_level, recommendation, and confidence_score.
    """
    # TODO: Integrate OpenAI API via LangChain for symptom analysis.
    logger.info(f"Triage request: symptoms={symptoms}, age={patient_age}")
    return {
        "triage_level": "MODERATE",
        "recommendation": "Schedule a consultation with a general physician within 24 hours.",
        "confidence_score": 0.85,
        "suggested_specialty": "General Medicine",
    }
