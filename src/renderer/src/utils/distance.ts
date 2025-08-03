export function getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getBoundingBox(lat: number, lng: number, radiusKm = 5) {
  const DEG_LAT_KM = 1 / 111.32; // 1 deg latitude in km
  const latOffset = radiusKm * DEG_LAT_KM;
  const lngOffset = radiusKm * (1 / (111.32 * Math.cos((lat * Math.PI) / 180)));

  return {
    bl_lat: lat - latOffset,
    bl_lng: lng - lngOffset,
    tr_lat: lat + latOffset,
    tr_lng: lng + lngOffset,
  };
}

