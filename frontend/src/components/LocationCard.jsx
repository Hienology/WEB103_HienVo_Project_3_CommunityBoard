import { Link } from 'react-router-dom';

export default function LocationCard({ location }) {
  return (
    <article className="card">
      <h3>{location.name}</h3>
      <p className="muted">{location.address}</p>
      <p>{location.description}</p>
      <Link to={`/locations/${location.id}`} className="button-link">
        View Events
      </Link>
    </article>
  );
}
