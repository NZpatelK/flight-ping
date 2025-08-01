import React from 'react';
import FlightCard from './components/FlightCard';

function App(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl mb-4">Live Flight Info</h1>
      <FlightCard flightIata="NZ1" />
    </div>
  );
}

export default App;
