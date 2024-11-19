import { Location } from "../types";

const EARTH_RADIUS = 6371;

function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

/**
 *  Function to calculate the distance between two locations expressing latitude and longitude in degrees.
 *  Returns the distance between this two locations in kilometers.
 *  Refer to {@link https://www.omnicalculator.com/other/latitude-longitude-distance|haversin formula}. 
 */

function getDistance(location1: Location, location2: Location) {
  const [lat1, lon1] = location1;
  const [lat2, lon2] = location2;

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS * c;
}

export default getDistance;
