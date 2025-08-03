const AVIATIONSTACK_API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY;
const BASE_URL = 'https://api.aviationstack.com/v1';

/**
 * Get airline name by IATA code
 */
export async function getAirlineNameByIata(iataCode: string): Promise<string> {
  if (!iataCode) return 'Unknown Airline';

  try {
    const response = await fetch(
      `${BASE_URL}/airlines?limit=14000&access_key=${AVIATIONSTACK_API_KEY}`
    )
    const data = await response.json();

    const airline = data.data.find((a: any) => a.iata_code === iataCode);
    return airline ? airline.airline_name : 'Unknown Airline';
  } catch (error) {
    console.error('Error fetching airline name:', error);
    return 'Unknown Airline';
  }
}
