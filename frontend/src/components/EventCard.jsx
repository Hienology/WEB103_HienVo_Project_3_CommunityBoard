function formatPrice(price) {
  const value = Number(price);
  return value === 0 ? 'Free' : `$${value.toFixed(2)}`;
}

export default function EventCard({ event }) {
  const eventDate = new Date(event.event_date);
  const isPast = eventDate < new Date();

  return (
    <article className={`card ${isPast ? 'past-event' : 'upcoming-event'}`}>
      <div className="badge-row">
        <span className="badge sport">{event.sport}</span>
        <span className="badge price">{formatPrice(event.price)}</span>
      </div>
      <h3>{event.title}</h3>
      <p className="muted"><strong>Date:</strong> {eventDate.toLocaleString()}</p>
      {event.location_name && <p className="muted"><strong>Location:</strong> {event.location_name}</p>}
      <p className="event-description">{event.description}</p>
      <div style={{ flexGrow: 1 }}></div>
      <div className="status-indicator">
        {isPast ? '• Past Event' : '• Upcoming Event'}
      </div>
    </article>
  );
}
