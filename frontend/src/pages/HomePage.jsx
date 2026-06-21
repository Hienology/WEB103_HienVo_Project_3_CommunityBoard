import { useEffect, useState } from 'react';
import LocationCard from '../components/LocationCard.jsx';
import { fetchLocations } from '../services/LocationsAPI.js';

export default function HomePage() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations().then(setLocations).catch(() => setLocations([]));
  }, []);

  return (
    <section>
      <h2>Explore Locations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </section>
  );
}
