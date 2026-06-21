import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import EventCard from '../components/EventCard.jsx';
import { fetchLocationById } from '../services/LocationsAPI.js';
import { fetchEventsByLocation } from '../services/EventsAPI.js';

export default function LocationDetailPage() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchLocationById(id),
      fetchEventsByLocation(id)
    ])
      .then(([locationData, eventsData]) => {
        setLocation(locationData);
        setEvents(eventsData);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load location details.');
        setLoading(false);
      });
  }, [id]);

  return (
    <section>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/" className="button-link">← Back to Locations</Link>
      </div>

      {loading && <div className="loading">Loading location details...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && location && (
        <>
          <div className="hero-section" style={{ padding: '2rem 1rem', background: 'linear-gradient(to right, #e2f0e9, #f7fbf9)' }}>
            <h2>{location.name}</h2>
            <p className="hero-p">{location.address}</p>
          </div>
          
          <h3 style={{ marginBottom: '1rem', color: '#0f3a2a' }}>Events at this location</h3>
          
          {events.length === 0 ? (
            <p className="muted">No events currently scheduled here.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
