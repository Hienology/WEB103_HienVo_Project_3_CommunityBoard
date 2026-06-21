import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard.jsx';
import { fetchEvents } from '../services/EventsAPI.js';

export default function AllEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <div className="hero-section" style={{ padding: '2rem 1rem' }}>
        <h2>All Community Events</h2>
        <p className="hero-p">Discover free and affordable sports events happening around you.</p>
      </div>

      {loading && <div className="loading">Loading events...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && events.length === 0 && (
        <p style={{ textAlign: 'center' }}>No events found.</p>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
