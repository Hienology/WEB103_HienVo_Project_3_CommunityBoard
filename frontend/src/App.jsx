import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AllEventsPage from './pages/AllEventsPage.jsx';
import LocationDetailPage from './pages/LocationDetailPage.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <h1>Victory Commons</h1>
        <p>Discover affordable and free local sports events in your neighborhood.</p>
        <nav>
          <Link to="/">Explore Locations</Link>
          <Link to="/events">All Events</Link>
        </nav>
      </header>

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
