// components/FlightCard.tsx
import React from 'react'
import './FlightCard.css'

interface FlightCardProps {
  id: string | number
  flightNum?: string
  origin?: string
  dest?: string
  airlineIata?: string
  airlineName?: string
  aircraftType?: string
  logoUrl?: string | null
}

const FlightCard: React.FC<FlightCardProps> = ({
  id,
  flightNum = 'Unknown',
  origin = 'N/A',
  dest = 'N/A',
  airlineIata,
  airlineName = 'Unknown Airline',
  logoUrl
}) => {
  return (
    <div key={id} className="flight-card">
      <div>
        {logoUrl && (
          <img
            src={logoUrl}
            alt={`${airlineName} logo`}
            className="w-[40px] h-[40px] object-contain rounded mb-2"
          />
        )}
        <p>
          <strong>Airline Name:</strong> {airlineName}
        </p>
        <p>
          <strong>Flight No:</strong> {flightNum}
        </p>
        <p>
          <strong>Depart:</strong> {origin}
        </p>
        <p>
          <strong>Arrival:</strong> {dest}
        </p>
      </div>
    </div>
  )
}

export default FlightCard
