import { defineStore } from 'pinia';
import { ref } from 'vue';
import { geocodeCity, getCurrentWeatherByCoords, getForecast } from '../services/weatherApi';
import type { CityGeo, Weather } from '../types/weather';

export const useWeatherStore = defineStore('weather', () => {
  const searchResults = ref<CityGeo[]>([]);
  const savedCities = ref<Weather[]>([]);
  const current = ref<Weather | null>(null);
  const onecall = ref<any | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function searchCity(q: string) {
    if (!q) return (searchResults.value = []);
    try {
      loading.value = true;
      const res = await geocodeCity(q);
      searchResults.value = res;
      loading.value = false;
    } catch (e: any) {
      error.value = e.message || 'Search failed';
    } finally { loading.value = false; }
  }

  async function fetchWeatherByCoords(lat: number, lon: number) {
    try {
      loading.value = true;
      current.value = await getCurrentWeatherByCoords(lat, lon);
      localStorage.setItem('currentWeather', JSON.stringify(current.value));
      // onecall.value = await getForecast(lat, lon);
      loading.value = false;
    } catch (e: any) {
      error.value = e.message || 'Fetch failed';
    } finally { loading.value = false; }
  }

  function addSavedCity(c: Weather) {
    if (!savedCities.value.find(s => s.coord.lat === c.coord.lat && s.coord.lon === c.coord.lon)) {
      savedCities.value.push(c);
      localStorage.setItem('savedCities', JSON.stringify(savedCities.value));
    }
  }

  function deleteSavedCity(c: Weather) {
    if (savedCities.value.find(s => s.coord.lat === c.coord.lat && s.coord.lon === c.coord.lon)) {
      savedCities.value = savedCities.value.filter((s)=>!(s.coord.lat === c.coord.lat && s.coord.lon === c.coord.lon && s.name===c.name));
      localStorage.setItem('savedCities', JSON.stringify(savedCities.value));
    }
  }

  function loadSaved() {
    const raw = localStorage.getItem('savedCities');
    if (raw) savedCities.value = JSON.parse(raw);
    const raw1 = localStorage.getItem('currentWeather');
    if (raw1) current.value = JSON.parse(raw1);
  }

  return { searchResults, savedCities, current, onecall, loading, error,
           searchCity, fetchWeatherByCoords, addSavedCity, deleteSavedCity, loadSaved };
});
