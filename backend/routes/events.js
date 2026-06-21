import express from 'express';
import { getAllEvents } from '../controllers/events.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events.' });
  }
});

export default router;
