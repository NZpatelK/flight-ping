const AVIATIONSTACK_API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY; // Replace with your actual key
const BASE_URL = 'https://aviationstack.com/api/v1';

export async function getAirlineNameByIata(iataCode: string): Promise<string> {
  if (!iataCode) return 'Unknown Airline';

  try {
    const response = await fetch(`${BASE_URL}/airlines?iata_code=${iataCode}&access_key=${AVIATIONSTACK_API_KEY}`);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      return data.data[0].airline_name || 'Unknown Airline';
    }
    return 'Unknown Airline';
  } catch (error) {
    console.error('Error fetching airline name:', error);
    return 'Unknown Airline';
  }
}
