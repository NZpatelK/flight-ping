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
  aircraftType: aircraftType = 'N/A',
  airlineName = 'Unknown Airline',
  logoUrl
}) => {
  return (
    <div key={id} className="flight-card">
      {logoUrl && <img src={logoUrl} alt={`${airlineName} logo`} />}
      <div className="flight-details">
        <p className="airline-name">{airlineName}</p>
        <div className="flight-info">
          <p>
            <strong>Flight No:</strong> {flightNum}
          </p>
          <p>
            <strong>Aircraft Type:</strong> {aircraftType}
          </p>
        </div>
        <div className="flight-route">
          <p>
            <strong>From:</strong>
            <span> {origin}</span>
          </p>
          <p>
            <strong>To:</strong><span> {dest}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default FlightCard
