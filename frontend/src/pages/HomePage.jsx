import { useEffect, useState } from 'react';
import LocationCard from '../components/LocationCard.jsx';
import { fetchLocations } from '../services/LocationsAPI.js';

export default function HomePage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLocations()
      .then((data) => {
        setLocations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load locations. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <div className="hero-section">
        <h2>Explore Locations</h2>
        <p className="hero-p">Find the best sports facilities and community spaces near you to enjoy active living.</p>
      </div>

      {loading && <div className="loading">Loading locations...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      )}
    </section>
  );
}
