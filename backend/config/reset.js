import pool from './database.js';

const locations = [
  ['Central Park Soccer Field', '125 Central Park Ave', 'Community-friendly field for youth and pickup soccer matches.'],
  ['Riverside Basketball Courts', '88 Riverside Drive', 'Outdoor courts hosting pickup basketball and weekend tournaments.'],
  ['Oakwood Baseball Diamond', '210 Oakwood Lane', 'Little league and amateur baseball games all season long.'],
  ['Willow Creek Multi-Sport Park', '500 Willow Creek Rd', 'Flexible venue for track meets and mixed sport events.']
];

const events = [
  ['U12 Soccer Finals', 'Soccer', '2026-07-10T17:30:00Z', 0, 'Youth championship match with local teams.', 1],
  ['Sunset Pickup Hoops', 'Basketball', '2026-07-08T01:00:00Z', 5, 'Casual evening run for all skill levels.', 2],
  ['Little League Opening Day', 'Baseball', '2026-07-12T15:00:00Z', 3, 'Family-friendly baseball opener with concessions.', 3],
  ['Community Track Sprint Night', 'Track & Field', '2026-07-15T00:30:00Z', 0, 'Timed sprint heats and fun relay events.', 4],
  ['Spring Soccer Friendly', 'Soccer', '2026-03-10T18:00:00Z', 0, 'Past exhibition game for style testing.', 1],
  ['Neighborhood 3v3 Throwback', 'Basketball', '2026-02-14T20:00:00Z', 2, 'Past 3v3 showcase event.', 2]
];

const resetDatabase = async () => {
  try {
    await pool.query('BEGIN');

    await pool.query('DROP TABLE IF EXISTS events;');
    await pool.query('DROP TABLE IF EXISTS locations;');

    await pool.query(`
      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        description TEXT NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        sport TEXT NOT NULL,
        event_date TIMESTAMPTZ NOT NULL,
        price NUMERIC(10, 2) NOT NULL DEFAULT 0,
        description TEXT NOT NULL,
        location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE
      );
    `);

    for (const location of locations) {
      await pool.query(
        'INSERT INTO locations (name, address, description) VALUES ($1, $2, $3);',
        location
      );
    }

    for (const event of events) {
      await pool.query(
        `INSERT INTO events (title, sport, event_date, price, description, location_id)
         VALUES ($1, $2, $3, $4, $5, $6);`,
        event
      );
    }

    await pool.query('COMMIT');
    // eslint-disable-next-line no-console
    console.log('Database reset complete.');
  } catch (error) {
    await pool.query('ROLLBACK');
    // eslint-disable-next-line no-console
    console.error('Database reset failed:', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

resetDatabase();
