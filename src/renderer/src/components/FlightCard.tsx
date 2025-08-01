import { useEffect, useState } from 'react'
import { getFlightStatus } from '../services/aviationStack'

export default function FlightCard({ flightIata }: { flightIata: string }) {
  const [flight, setFlight] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      const data = await getFlightStatus(flightIata)
      setFlight(data)
    }
    fetchData()
  }, [flightIata])

  if (!flight) return <p>Loading...</p>

  const airlineIata = flight.airline?.iata?.toLowerCase() || 'default'
  const logoUrl = `https://content.airhex.com/content/logos/airlines_${airlineIata}_70_70_t.png`

  return (
    <div className="p-4 border rounded shadow w-96">
      <img
        src={logoUrl}
        alt="Airline Logo"
        className="w-16 h-16 object-contain mb-2"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
      <h2 className="text-xl font-bold">
        {flight.airline.name} — {flight.flight.iata}
      </h2>
      <p>
        From: {flight.departure.airport} ({flight.departure.iata})
      </p>
      <p>
        To: {flight.arrival.airport} ({flight.arrival.iata})
      </p>
      <p>Status: {flight.flight_status}</p>
      <p>Aircraft: {flight.aircraft?.icao || 'Unknown'}</p>
    </div>
  )
}
