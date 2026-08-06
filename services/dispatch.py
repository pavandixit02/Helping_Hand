"""
Ambulance dispatch service — PostGIS-powered nearest-unit routing.
"""

import logging

logger = logging.getLogger(__name__)


def find_nearest_ambulance(latitude: float, longitude: float, radius_km: float = 10.0):
    """
    Find the nearest available ambulance using PostGIS geospatial queries.

    Args:
        latitude: GPS latitude of the SOS trigger.
        longitude: GPS longitude of the SOS trigger.
        radius_km: Search radius in kilometers.

    Returns:
        The nearest available ambulance record, or None.
    """
    # TODO: Implement PostGIS ST_DWithin query against Ambulance fleet table.
    # from django.contrib.gis.db.models.functions import Distance
    # from django.contrib.gis.geos import Point
    #
    # sos_point = Point(longitude, latitude, srid=4326)
    # return Ambulance.objects.filter(
    #     status="AVAILABLE",
    #     location__dwithin=(sos_point, D(km=radius_km)),
    # ).annotate(distance=Distance("location", sos_point)).order_by("distance").first()
    logger.info(f"Dispatch request: lat={latitude}, lon={longitude}, radius={radius_km}km")
    return None


def dispatch_ambulance(ambulance_id, sos_alert_id):
    """
    Assign an ambulance to an SOS alert and notify the EMT via Django Channels.
    """
    # TODO: Update ambulance status, create DispatchRecord, send WebSocket notification.
    logger.info(f"Dispatching ambulance {ambulance_id} for SOS {sos_alert_id}")
