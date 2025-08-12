<template>
  <div class="page">
    <header class="page-header">
      <h1>Weather</h1>
      <router-link to="/profile/edit">
        <img width="24" height="24" src="/src/assets/user.svg" alt="user"/>
      </router-link>
    </header>

    <router-link to="/search">
      <SearchBar @search="onSearch" />
    </router-link>

    <!-- <div v-if="store.loading">Loading...</div>
    <div v-if="store.error">{{ store.error }}</div> -->

    <div class="cards" v-if="!store.loading">
      <!-- current location card (if loaded) -->
      <WeatherCard
         v-if="store.current"
         :title="'My Location'"
         :subtitle="store.current.name"
         :description="store.current.weather[0].description"
         :temp="store.current.main.temp"
         :hi="store.current.main.temp_max"
         :lo="store.current.main.temp_min"
         :isDay="isDaytime(store.current.dt,store.current.timezone)"
         @open="openDetail(store.current)"
      />

      <!-- saved cities -->
      <WeatherCard
         v-for="c in store.savedCities"
         :key="c.coord.lat + '-' + c.coord.lon"
         :title="c.name"
         :subtitle="formatUnixTimestampTo12HrTime(c.dt,c.timezone)"
         :description="c.weather[0].description"
         :temp="c.main.temp"
         :hi="c.main.temp_max"
         :lo="c.main.temp_min"
         :isDay="isDaytime(c.dt,c.timezone)"
         @open="openDetail(c)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import SearchBar from '../components/molecules/SearchBar.vue';
import WeatherCard from '../components/organisms/WeatherCard.vue';
import { useWeatherStore } from '../store/weatherStore';
import { useRouter } from 'vue-router';
import type { Weather } from '../types/weather';

const store = useWeatherStore();
const router = useRouter();

function success(p: GeolocationPosition) {
  store.fetchWeatherByCoords(p.coords.latitude, p.coords.longitude);
}

onMounted(() => {
  store.loadSaved();
  if (navigator.permissions) {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition(success);
      } else {
        console.log("Need user gesture for location access");
      }
    });
  }
  // get geolocation and fetch current weather
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(p => {
  //     store.fetchWeatherByCoords(p.coords.latitude, p.coords.longitude);
  //   }, () => {
  //     // fallback: fetch a default city if user denies
  //   });
  // }
});

const formatUnixTimestampTo12HrTime: (utcSeconds: number, timezoneOffset: number) => string = 
  (utcSeconds: number, timezoneOffset: number): string => {
    const date = new Date((utcSeconds + timezoneOffset) * 1000); 
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutesStr = minutes.toString().padStart(2, '0');
    return `${hours}:${minutesStr} ${period}`;
};

const isDaytime = (utcSeconds: number, timezoneOffset: number): boolean => {
  const date = new Date((utcSeconds + timezoneOffset) * 1000);
  const hours = date.getHours();
  return hours >= 6 && hours < 18;
};



function onSearch(q: string) {
  if (!q) return router.push({ name: 'Search' });
  store.searchCity(q);
  router.push({ name: 'Search', query: { q } });
}

function openDetail(data : Weather) {
  router.push({ name: 'Detail', query: { lat: data.coord.lat, lon: data.coord.lon , state : data.name , country : "" , opp : 1} });
}
</script>

<style scoped lang="scss">
.page{ padding:22px; }
.page-header{ display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
.cards{ margin-top:18px; display:flex; flex-direction:column; }
</style>
