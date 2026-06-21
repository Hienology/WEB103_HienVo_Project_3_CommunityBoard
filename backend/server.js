import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import eventsRouter from './routes/events.js';
import locationsRouter from './routes/locations.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/events', eventsRouter);
app.use('/api/locations', locationsRouter);

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Victory Commons API listening on port ${port}`);
  });
}

export default app;
