import axios from 'axios';

const API_URL = 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary';
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY; // Replace with your actual RapidAPI key

export async function getFlightsInBoundary() {
  const response = await axios.get(API_URL, {
    params: {
      bl_lat: -36.97779,
      bl_lng: 174.88440,
      tr_lat: -36.94175,
      tr_lng: 174.92960,
      limit: 300,
    },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com',
    },
  });

  return response.data.aircraft || [];
}
