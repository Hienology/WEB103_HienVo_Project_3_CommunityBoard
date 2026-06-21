# Victory Commons

Victory Commons is a full-stack community sports events board.

## Structure

- `backend/` Node.js + Express API with PostgreSQL
  - `config/database.js` pg Pool using environment variables
  - `config/reset.js` resets and seeds `locations` and `events`
  - `controllers/` query logic
  - `routes/` API routing
  - `server.js` mounts routers under `/api`
- `frontend/` React + Vite + React Router UI
  - `src/services` fetch-based API layer
  - `src/components` reusable LocationCard and EventCard
  - `src/pages` Home, All Events, and Location Detail pages

## API Endpoints

- `GET /api/locations`
- `GET /api/locations/:id`
- `GET /api/locations/:id/events`
- `GET /api/events`

## Setup

1. Backend environment (`backend/.env`):
   - `DATABASE_URL=...`
   - `PORT=3000` (optional)
2. Install dependencies:
   - `npm run install:all`
3. Reset and seed DB:
   - `npm --prefix backend run reset`
4. Run backend:
   - `npm run dev:backend`
5. Run frontend:
   - `npm run dev:frontend`

Set `VITE_API_BASE_URL` in frontend env if backend is not `http://localhost:3000/api`.
