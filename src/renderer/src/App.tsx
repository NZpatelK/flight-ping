import React from 'react';
import FlightCard from './components/FlightCard';
          )

    checkFlights();
    const interval = setInterval(checkFlights, 10000);
    return () => clearInterval(interval);
  }, [airlineNamesCache]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Flights within 2km of Auckland</h2>
      {nearbyFlights.length === 0 ? (
        <p>No flights detected.</p>
      ) : (
        nearbyFlights.map((f, idx) => {
          const [id, hex, lat, lon, heading, alt, speed, , callsign, aircraftType, reg, timestamp, origin, dest, flightNum] = f;
          const airlineIata = flightNum?.slice(0, 2).toUpperCase();
          const logoUrl = airlineIata
            ? `https://content.airhex.com/content/logos/airlines_${airlineIata}_70_70_t.png`
            : null;
          const airlineName = airlineIata
            ? airlineNamesCache[airlineIata] || 'Loading airline name...'
            : 'Unknown Airline';

          return (
            <div key={id || idx} className="border shadow rounded p-3 mb-3 flex items-center gap-4">
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt={airlineIata}
                  className="w-[40px] h-[40px] object-contain rounded"
                />
              )}
              <div>
                <p><strong>Airline Logo:</strong></p>
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt={`${airlineName} logo`}
                    className="w-[40px] h-[40px] object-contain rounded mb-2"
                  />
                )}
                <p><strong>Airline Name:</strong> {airlineName}</p>
                <p><strong>Flight No:</strong> {flightNum || 'Unknown'}</p>
                <p><strong>Depart:</strong> {origin || 'N/A'}</p>
                <p><strong>Arrival:</strong> {dest || 'N/A'}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
