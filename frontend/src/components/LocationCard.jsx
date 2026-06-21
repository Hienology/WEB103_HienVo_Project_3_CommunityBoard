import { Link } from 'react-router-dom';

const LocationCard = ({ location }) => {
  return (
    <Link 
      to={`/locations/${location.id}`} 
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <article className="card" style={{ 
        padding: 0, 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'stretch',
        minHeight: '180px',
        overflow: 'hidden'
      }}>
        <div style={{ width: '180px', aspectRatio: '1 / 1', flexShrink: 0, backgroundColor: '#e2e8f0' }}>
          <img 
            src={location.image_url} 
            alt={location.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
        
        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <h3 style={{ marginTop: 0 }}>{location.name}</h3>
          
          <div className="badge-row" style={{ marginTop: '0.25rem' }}>
            {location.sport_focus && <span className="badge sport">{location.sport_focus}</span>}
          </div>

          <p className="event-description" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
            {location.description}
          </p>
          
          <div style={{ flexGrow: 1 }}></div>
          
          <div style={{ 
            color: '#1f6b4f', 
            fontWeight: '600', 
            fontSize: '0.9rem',
            textAlign: 'right'
          }}>
            Explore events →
          </div>
        </div>
      </article>
    </Link>
  );
};

export default LocationCard;