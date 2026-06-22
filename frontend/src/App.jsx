import { Link, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AllEventsPage from './pages/AllEventsPage.jsx';
import LocationDetailPage from './pages/LocationDetailPage.jsx';

// Shared background image for home and all events page
const DEFAULT_BG = 'https://static.vecteezy.com/system/resources/previews/053/424/566/non_2x/aerial-view-of-upscale-residential-neighborhood-with-curving-road-lush-greenery-and-lakes-at-sunset-photo.jpeg';

function GlobalBackground() {
  const location = useLocation();
  const isLocationPage = location.pathname.startsWith('/locations/');
  
  if (isLocationPage) {
    return null; // The location page renders its own specific background
  }

  return (
    <div 
      className="fixed-bg" 
      style={{
        backgroundImage: `linear-gradient(rgba(15, 58, 42, 0.8), rgba(15, 58, 42, 0.8)), url('${DEFAULT_BG}')`
      }}
    />
  );
}

function Header() {
  const location = useLocation();
  const isLocationPage = location.pathname.startsWith('/locations/');
  
  if (isLocationPage) {
    return null;
  }

  return (
    <header className="site-header">
      <h1>Victory Commons</h1>
      <p style={{ color: 'rgba(255,255,255,0.9)' }}>Discover affordable and free local sports events in your neighborhood.</p>
      <nav>
        <Link to="/">Explore Locations</Link>
        <Link to="/events">All Events</Link>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <GlobalBackground />
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<AllEventsPage />} />
          <Route path="/locations/:id" element={<LocationDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}
