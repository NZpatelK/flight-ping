import { useEffect, useState } from 'react'
import { getFlightsInBoundary } from './services/flightRadar'
import { getAirlineNameByIata } from './services/aviationstack'
import FlightCard from './components/FlightCard'
import './assets/main.css'

export default function FlightRadarNearAuckland() {
  const [nearbyFlights, setNearbyFlights] = useState<any[][]>([])
  const [airlineNamesCache, setAirlineNamesCache] = useState<Record<string, string>>({})
  const [aircraftCache, setAircraftCache] = useState<
    Record<string, { model: string; manufacturer: string }>
  >({})

  useEffect(() => {
    const checkFlights = async () => {
      try {
        const allFlights = await getFlightsInBoundary()
        if (allFlights.length !== 0) window.electron.ipcRenderer.send('notify', 'Hello from Renderer!')
        setNearbyFlights(allFlights)

        const uniqueIatas = new Set<string>()
        const uniqueAircraftTypes = new Set<string>()

        allFlights.forEach((f) => {
          const flightNum = f[14]
          const aircraftType = f[9]
          if (flightNum) uniqueIatas.add(flightNum.slice(0, 2).toUpperCase())
          if (aircraftType) uniqueAircraftTypes.add(aircraftType)
        })

        for (const iata of uniqueIatas) {
          if (!airlineNamesCache[iata]) {
            const name = await getAirlineNameByIata(iata)
            setAirlineNamesCache((prev) => ({ ...prev, [iata]: name }))
          }
        }
      } catch (err) {
        console.error('Flight fetch error:', err)
      }
    }

    // checkFlights()
    // const interval = setInterval(checkFlights, 30000)
    // return () => clearInterval(interval)
  }, [airlineNamesCache, aircraftCache])

  return (
    <div className="p-10 bg-blue-400">
      <FlightCard
        id="1"
        logoUrl={'https://content.airhex.com/content/logos/airlines_AA_70_70_t.png'}
      />
      {/* <h2 className="text-xl font-bold mb-4">Flights within 2km of Auckland</h2>
      {nearbyFlights.length === 0 ? (
        <p>No flights detected.</p>
      ) : (
        nearbyFlights.map((f, idx) => {
          const [
            id,
            hex,
            ,
            ,
            heading,
            alt,
            speed,
            ,
            callsign,
            aircraftType,
            reg,
            timestamp,
            origin,
            dest,
            flightNum
          ] = f

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
      )} */}
    </div>
  )
}
