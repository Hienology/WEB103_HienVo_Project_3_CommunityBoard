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
      {loading && <div className="loading">Loading location details...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && location && (
        <>
          <div 
            className="fixed-bg" 
            style={{
              backgroundImage: `linear-gradient(rgba(15, 58, 42, 0.85), rgba(15, 58, 42, 0.85)), url('${location.image_url}')`
            }}
          />

          <header className="site-header">
            <h1 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '2.5rem' }}>{location.name}</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, maxWidth: '600px', fontSize: '1.1rem' }}>{location.description}</p>
            <nav style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem' }}>
              <Link to="/">← Back to Locations</Link>
              <Link to="/events">All Events</Link>
            </nav>
          </header>
          
          <h3 style={{ marginBottom: '1rem', color: 'white' }}>Events at this location</h3>
          
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
