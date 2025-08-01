import axios from 'axios';

const API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY;
const BASE_URL = 'https://api.aviationstack.com/v1';

export const getFlightStatus = async (flightIata: string) => {
  console.log('Fetching flight status for:', flightIata);
  const res = await axios.get(`${BASE_URL}/flights`, {
    params: { access_key: API_KEY, flight_iata: flightIata }
  });
  console.log('Flight Status Response:', res.data);
  return res.data.data[0];
};
