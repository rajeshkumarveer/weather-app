<template>
  <div class="weather-detail">
    <!-- Header Section -->
    <div class="header">
      <div class="header-top">
        <button class="icon-btn" @click="backHome">
          <span class="material-icons"><img width="24" height="24" src="/src/assets/chevron_left.svg" alt="back"/></span>
        </button>
        <div class="date">{{ state }} {{ country!="" ? (",") : "" }} {{ country }}</div>
        <button v-if="isFromSearch"  class="icon-btn" @click="addToFavorites">
          <span class="material-icons"><img width="16" height="16" src="/src/assets/plus.svg" alt="add"/></span>
        </button>
        <button v-if="!isFromSearch"  class="icon-btn" @click="deleteFromFavorites">
          <span class="material-icons"><img width="16" height="16" src="/src/assets/delete.svg" alt="delete"/></span>
        </button>
      </div>
      <div class="date">{{ formatFullDate(new Date()) }}</div>
      <img
        class="weather-icon"
        :src="`https://openweathermap.org/img/wn/${current?.weather[0].icon}@4x.png`"
        alt="Weather icon"
      />
      <div class="temp">
        {{ current?.main?.temp != null ? Math.round(current.main.temp) + '° C' : '' }}
      </div>
    <div class="desc">{{ capitalize(current?.weather[0].description) }}</div>
      <div class="last-update">
        Last Update {{ formatTime(new Date()) }} 
        <span class="material-icons refresh-icon"><img width="16" height="16" src="/src/assets/refresh.svg" alt="refresh"/></span>
      </div>
    </div>

    <!-- Hourly Forecast -->
    <section class="section">
      <h2>Hourly Forecast</h2>
      <div class="hourly-list">
        <div v-for="h in hourly" :key="h.dt" class="hour-card">
          <img :src="`https://openweathermap.org/img/wn/${h.weather[0].icon}@2x.png`" width="72px"/>
          <div class="hour-temp">{{ Math.round(h.main.temp) }}°</div>
          <div class="hour-time">{{ formatTime(h.dt_txt) }}</div>
        </div>
      </div>
    </section>

    <!-- Weekly Forecast -->
    <section class="section">
      <h2>Weekly Forecast</h2>
      <div
        v-for="d in daily"
        :key="d.date"
        class="day-card"
      >
        <div class="day-info">
          <div class="img-info">
            <img :src="`https://openweathermap.org/img/wn/${d.icon}@2x.png`"  width="60px" />
          </div>
          <div>
            <div class="day-name">{{ formatDay(d.date) }}</div>
            <div class="day-desc">{{ capitalize(d.description) }}</div>
          </div>
        </div>
        <div class="day-info">
          <div class="day-temp">{{ Math.round(d.max) }}° C</div>
          <button class="icon-btn">
            <span class="material-icons" style="padding-left: 10px;"><img width="14" height="14" src="/src/assets/coolicon.svg" alt="arrow"/></span>
        </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCurrentWeatherByCoords , getForecast } from '../services/weatherApi';
import { groupHourly, groupDaily } from '../utils/weatherTransform';
import type { Weather } from '../types/weather';
import { useWeatherStore } from '../store/weatherStore';
const store = useWeatherStore();

const route = useRoute();
const router = useRouter();
const lat = Number(route.query.lat);
const lon = Number(route.query.lon);
const isFromSearch : boolean = Number(route.query.opp)==0;
const state = route.query.state as string;
const country = route.query.country as string;

const current = ref<Weather>();
const hourly = ref<any[]>([]);
const daily = ref<any[]>([]);

onMounted(async () => {
  current.value = await getCurrentWeatherByCoords(lat, lon);
  if (current.value) {
    current.value.name = state;
  }
  const forecastData = await getForecast(lat, lon);
  hourly.value = groupHourly(forecastData.list);
  daily.value = groupDaily(forecastData.list);
});

function formatTime(txt: string | Date) {
  return new Date(txt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}
function formatDay(date: string) {
  return new Date(date).toLocaleDateString([], { weekday: 'long' });
}
function formatFullDate(date: Date) {
  return date.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function capitalize(str?: string) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}
function addToFavorites() {
  if (current.value) {
    store.addSavedCity(current.value);
  }
  router.push({ path: '/' });
}
function deleteFromFavorites(){
  if (current.value) {
    store.deleteSavedCity(current.value);
  }
  router.push({ path: '/' });
}
function backHome(){
  router.push({ path: '/' });
}
</script>

<style scoped lang="scss">
.weather-detail {
  background-color: #f9f9f9;
}

/* HEADER */
.header {
  background: linear-gradient(180deg, #4F80FA, #335FD1);
  text-align: center;
  padding: 22px;
  color: #fff;
  // border-bottom-left-radius: 20px;
  // border-bottom-right-radius: 20px;
}
.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.icon-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
}
.date {
  // margin-bottom: 8px;
  font-size: 16px;
  // opacity: 0.9;
}
.weather-icon {
  width: 120px;
  // margin: 10px auto;
}
.temp {
  font-size: 24px;
  font-weight: 400;
}
.desc {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 8px;
}
.last-update {
  font-size: 14px;
  opacity: 0.9;
}
.refresh-icon {
  font-size: 16px;
  vertical-align: middle;
}

/* SECTIONS */
.section {
  padding: 22px;
  padding-bottom: 2px;
}
h2 {
  font-size: 24px;
  margin-bottom: 12px;
  font-weight: 500;
}

/* HOURLY */
.hourly-list {
  display: flex;
  gap: 10px;
  overflow-x: auto;
}
.hour-card {
  background: white;
  border-radius: 4px;
  // padding: 10px;
  text-align: center;
  min-width: 94px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
.hour-temp {
  font-size: 16px;
  font-weight: bold;
}
.hour-time {
  font-size: 14px;
  color: #494343;
  padding: 4px 0 10px 0;
}

/* WEEKLY */
.day-card {
  background: #D2DFFF;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.img-info{
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background-color: #9AB6FF;
}
.day-info {
  display: flex;
  align-items: center;
  gap: 8px;
}
.day-name {
  font-weight: bold;
  font-size: 14px;
}
.day-desc {
  font-size: 13px;
  color: #494343;
}
.day-temp {
  font-weight: bold;
  font: 14px;
}
</style>
