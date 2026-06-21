const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export async function fetchLocations() {
  const response = await fetch(`${API_BASE}/locations`);
  if (!response.ok) throw new Error('Failed to load locations');
  return response.json();
}

export async function fetchLocationById(id) {
  const response = await fetch(`${API_BASE}/locations/${id}`);
  if (!response.ok) throw new Error('Failed to load location');
  return response.json();
}
