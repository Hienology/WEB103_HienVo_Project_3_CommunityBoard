import { Link } from 'react-router-dom';

const LocationCard = ({ location, eventCount = 0 }) => {
  return (
    <Link 
      to={`/locations/${location.id}`}
      className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all duration-200"
    >
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img 
          src={location.image_url} 
          alt={location.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-semibold tracking-tight">
            {location.name}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-slate-600 line-clamp-2 mb-4">
          {location.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            {eventCount} upcoming games
          </span>
          
          <span className="text-emerald-600 text-sm font-medium group-hover:underline">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;