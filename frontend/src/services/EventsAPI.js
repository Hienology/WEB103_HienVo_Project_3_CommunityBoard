const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export async function fetchEvents() {
  const response = await fetch(`${API_BASE}/events`);
  if (!response.ok) throw new Error('Failed to load events');
  return response.json();
}

export async function fetchEventsByLocation(locationId) {
  const response = await fetch(`${API_BASE}/locations/${locationId}/events`);
  if (!response.ok) throw new Error('Failed to load location events');
  return response.json();
}
