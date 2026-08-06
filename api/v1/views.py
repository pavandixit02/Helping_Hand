"""
API v1 views — Django REST Framework endpoints.
"""

from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.appointments.models import Appointment, Service

from .serializers import AppointmentSerializer, ServiceSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def health_check(request):
    """API health check endpoint for load balancers and monitoring."""
    return Response(
        {
            "status": "ok",
            "message": "Helping Hand API is running",
            "version": "1.0.0",
        },
        status=status.HTTP_200_OK,
    )


class LoginView(generics.GenericAPIView):
    """Token-based login endpoint."""
    permission_classes = [AllowAny]

    def post(self, request):
        # TODO: Implement token authentication flow.
        return Response({"detail": "Login endpoint"}, status=status.HTTP_200_OK)


class AppointmentListCreateView(generics.ListCreateAPIView):
    """List and create appointments via API."""
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.all()


class AppointmentDetailView(generics.RetrieveUpdateAPIView):
    """Retrieve and update a specific appointment."""
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]
    queryset = Appointment.objects.all()


class ServiceListView(generics.ListAPIView):
    """List available healthcare services."""
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]
    queryset = Service.objects.filter(is_active=True)
