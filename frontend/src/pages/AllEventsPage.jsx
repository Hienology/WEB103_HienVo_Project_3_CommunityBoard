import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard.jsx';
import { fetchEvents } from '../services/EventsAPI.js';

export default function AllEventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(setEvents).catch(() => setEvents([]));
  }, []);

  return (
    <section>
      <h2>All Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
