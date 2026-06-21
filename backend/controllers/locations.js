import { pool } from '../config/database.js';

export const getAllLocations = async () => {
  const result = await pool.query('SELECT id, name, sport_focus, image_url, description FROM locations ORDER BY id;');
  return result.rows;
};

export const getLocationById = async (id) => {
  const result = await pool.query(
    'SELECT id, name, sport_focus, image_url, description FROM locations WHERE id = $1;',
    [id]
  );
  return result.rows[0] ?? null;
};
