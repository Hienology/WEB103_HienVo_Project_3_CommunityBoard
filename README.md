# Victory Commons

Victory Commons is a full-stack community sports events board that connects local residents with free and affordable sports activities in their neighborhood, fostering active living and community engagement.

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

## Features
- **Responsive Layouts**: Responsive 3-column event grids (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
- **Modern Typography**: Interfaced with Space Grotesk font stack for clean headings.
- **Improved UI/UX**: Hover effects, clear sport and price badges with visual status indicators.
- **Robust Error Handling**: Added clean loading and error states to all pages.

## Deployment Notes (Render)

### Deploying the Backend
1. In Render, select **New > Web Service**.
2. Connect your GitHub repository.
3. Set the **Root Directory** to `backend`.
4. Set the **Build Command** to `npm install`.
5. Set the **Start Command** to `npm start`.
6. Add your required Environment Variables (e.g. `DATABASE_URL`, `PORT`).

### Deploying the Frontend
1. In Render, select **New > Static Site**.
2. Connect your GitHub repository.
3. Set the **Root Directory** to `frontend`.
4. Set the **Build Command** to `npm install && npm run build`.
5. Set the **Publish Directory** to `dist`.

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
