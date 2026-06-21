import express from 'express';
import { getAllLocations, getLocationById } from '../controllers/locations.js';
import { getEventsByLocation } from '../controllers/events.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const locations = await getAllLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch locations.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const location = await getLocationById(req.params.id);
    if (!location) {
      res.status(404).json({ error: 'Location not found.' });
      return;
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch location.' });
  }
});

router.get('/:id/events', async (req, res) => {
  try {
    const location = await getLocationById(req.params.id);
    if (!location) {
      res.status(404).json({ error: 'Location not found.' });
      return;
    }
    const events = await getEventsByLocation(req.params.id);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events for location.' });
  }
});

export default router;
