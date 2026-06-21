import { pool } from '../config/database.js';

const BASE_EVENT_SELECT = `
SELECT
  e.id,
  e.title,
  e.sport,
  e.event_date,
  e.price,
  e.description,
  e.location_id,
  e.image_url,
  l.name AS location_name,
  l.image_url AS location_image_url
FROM events e
JOIN locations l ON l.id = e.location_id
`;

export const getAllEvents = async () => {
  const result = await pool.query(`${BASE_EVENT_SELECT} ORDER BY e.event_date ASC, e.id ASC;`);
  return result.rows;
};

export const getEventsByLocation = async (locationId) => {
  const result = await pool.query(
    `${BASE_EVENT_SELECT} WHERE e.location_id = $1 ORDER BY e.event_date ASC, e.id ASC;`,
    [locationId]
  );
  return result.rows;
};
