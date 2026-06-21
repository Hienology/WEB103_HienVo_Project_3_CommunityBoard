import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventCard from '../components/EventCard.jsx';
import { fetchLocationById } from '../services/LocationsAPI.js';
import { fetchEventsByLocation } from '../services/EventsAPI.js';

export default function LocationDetailPage() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchLocationById(id).then(setLocation).catch(() => setLocation(null));
    fetchEventsByLocation(id).then(setEvents).catch(() => setEvents([]));
  }, [id]);

  return (
    <section>
      <h2>{location?.name ?? 'Location Details'}</h2>
      {location && <p className="muted">{location.address}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
