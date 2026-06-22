function formatPrice(price) {
  // If price is explicitly "Free" or null/undefined, return "Free"
  if (!price || price.toLowerCase() === 'free') return 'Free';
  
  // If it's a string like "$", "$$", "$$$", just return it as is
  if (price.startsWith('$')) return price;
  
  // Otherwise, try to format it as a number
  const value = Number(price);
  return isNaN(value) || value === 0 ? price : `$${value.toFixed(2)}`;
}

export default function EventCard({ event }) {
  const eventDate = new Date(event.event_date);
  const isPast = eventDate < new Date();
  
  // Use event-specific image if available, fallback to location image
  const displayImage = event.image_url || event.location_image_url;

  return (
    <article
      className={`card ${isPast ? 'past-event' : 'upcoming-event'}`}
      style={{ padding: 0, overflow: 'hidden', height: '100%', minHeight: '430px', display: 'flex', flexDirection: 'column' }}
    >
      {displayImage && (
        <img 
          src={displayImage} 
          alt={event.title} 
          style={{ width: '100%', height: '180px', objectFit: 'cover', flexShrink: 0 }} 
        />
      )}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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
      </div>
    </article>
  );
}
