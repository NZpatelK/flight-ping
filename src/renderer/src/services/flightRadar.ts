import axios from 'axios';
import {getBoundingBox} from '../utils/distance';

const API_URL = 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary';
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const location = getBoundingBox(25.21426, 55.45449, 5);

export async function getFlightsInBoundary() {
  const response = await axios.get(API_URL, {
    params: {
      bl_lat: location.bl_lat,
      bl_lng: location.bl_lng,
      tr_lat: location.tr_lat,
      tr_lng: location.tr_lng,
      limit: 300,
    },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com',
    },
  });

  return response.data.aircraft || [];
}
