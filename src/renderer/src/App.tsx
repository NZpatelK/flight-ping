import { JSX, useEffect, useRef, useState } from 'react'
import { getFlightsInBoundary } from './services/flightRadar'
import { getAirlineNameByIata } from './services/aviationstack'
import FlightCard from './components/FlightCard'
import './assets/main.css'

export default function FlightRadarNearAuckland(): JSX.Element {
  const [nearbyFlights, setNearbyFlights] = useState<any[][]>([])
  const [airlineNamesCache, setAirlineNamesCache] = useState<Record<string, string>>({})
  const [aircraftCache, setAircraftCache] = useState<
    Record<string, { model: string; manufacturer: string }>
  >({})

  // Track notified flights with timestamps
  const notifiedFlightsRef = useRef<Map<string, number>>(new Map())

  useEffect(() => {
    const checkFlights = async () => {
      try {
        const allFlights = await getFlightsInBoundary()
        setNearbyFlights(allFlights)

        const now = Date.now()
        const NOTIFY_EXPIRY_MS = 10 * 60 * 1000 // 10 minutes

        // Clean up old flight notifications
        for (const [id, time] of notifiedFlightsRef.current.entries()) {
          if (now - time > NOTIFY_EXPIRY_MS) {
            notifiedFlightsRef.current.delete(id)
          }
        }

        // Collect IATA codes
        const uniqueIatas = new Set<string>()
        allFlights.forEach((f) => {
          const flightNum = f[14]
          if (flightNum) uniqueIatas.add(flightNum.slice(0, 2).toUpperCase())
        })

        for (const iata of uniqueIatas) {
          if (!airlineNamesCache[iata]) {
            const name = await getAirlineNameByIata(iata)
            setAirlineNamesCache((prev) => ({ ...prev, [iata]: name }))
          }
        }

        // Notify new flights
        allFlights.forEach(async (f) => {
          const [
            id, // 0
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            callsign, // 8
            aircraftType, // 9
            reg, // 10
            timestamp, // 11
            origin, // 12
            dest, // 13
            flightNum // 14
          ] = f

          const flightId = id || callsign
          if (!flightId || notifiedFlightsRef.current.has(flightId)) return

          const airlineIata = flightNum?.slice(0, 2).toUpperCase()
          const airlineName = airlineIata
            ? (await getAirlineNameByIata(airlineIata)) || 'Unknown Airline'
            : 'Unknown Airline'

          if (!flightNum || !origin || !dest || !aircraftType || !airlineIata) return

          const payload = {
            title: `${airlineName} – ${flightNum}`,
            body: `${origin} → ${dest}\n${aircraftType}`,
            iconUrl: `https://content.airhex.com/content/logos/airlines_${airlineIata}_70_70_t.png`
          }

          window.electron.ipcRenderer.send('notify', payload)
          notifiedFlightsRef.current.set(flightId, now)
        })
      } catch (err) {
        console.error('Flight fetch error:', err)
      }
    }

    checkFlights()
    const interval = setInterval(checkFlights, 30000)
    return () => clearInterval(interval)
  }, [airlineNamesCache, aircraftCache])

  return (
    <div className="p-10 bg-blue-400">
      <h2 className="text-xl font-bold mb-4">Flights within 5km of your location</h2>
      {nearbyFlights.length === 0 ? (
        <p>No flights detected.</p>
      ) : (
        nearbyFlights.map((f, idx) => {
          const [id, , , , , , , , , aircraftType, , , origin, dest, flightNum] = f

          const airlineIata = flightNum?.slice(0, 2).toUpperCase()
          const logoUrl = airlineIata
            ? `https://content.airhex.com/content/logos/airlines_${airlineIata}_70_70_t.png`
            : null
          const airlineName = airlineIata
            ? airlineNamesCache[airlineIata] || 'Loading airline name...'
            : 'Unknown Airline'

          return (
            <FlightCard
              key={id || idx}
              id={id || idx}
              flightNum={flightNum}
              origin={origin}
              dest={dest}
              airlineIata={airlineIata}
              airlineName={airlineName}
              aircraftType={aircraftType}
              logoUrl={logoUrl}
            />
          )
        })
      )}
    </div>
  )
}
