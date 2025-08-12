import axios from 'axios';

const KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const BASE = import.meta.env.VITE_OPENWEATHER_URL;

const api = axios.create({ baseURL: BASE, timeout: 20000 });

// Get city coordinates
export async function geocodeCity(q: string, limit = 5) {
  const res = await api.get(`/geo/1.0/direct`, {
    params: { q, limit, appid: KEY }
  });
  return res.data;
}

// Current weather
export async function getCurrentWeatherByCoords(lat: number, lon: number) {
  const res = await api.get(`/data/2.5/weather`, {
    params: { lat, lon, units: 'metric', appid: KEY }
  });
  return res.data;
}

// Forecast (hourly + daily from same endpoint)
export async function getForecast(lat: number, lon: number) {
  const res = await api.get(`/data/2.5/forecast`, {
    params: { lat, lon, units: 'metric', appid: KEY }
  });
  return res.data; // 3-hour step forecast for 5 days
}
