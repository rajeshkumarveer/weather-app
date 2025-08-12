<template>
  <div class="search-page">
    <SearchBar v-model="q" @search="onSearch" />
    <ul>
      <li v-for="c in store.searchResults" :key="c.lat + c.lon" @click="select(c)">
        <div class="name">{{ c.name }}<span v-if="c.state">, {{c.state}}</span> <span v-if="c.country">, {{c.country}}</span></div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"> 
import { ref, watch } from 'vue';
import SearchBar from '../components/molecules/SearchBar.vue';
import { useWeatherStore } from '../store/weatherStore';
import { useRouter, useRoute } from 'vue-router';

const store = useWeatherStore();
const q = ref('');
const route = useRoute();
const router = useRouter();

if (route.query.q) { q.value = String(route.query.q); store.searchCity(q.value); }

function onSearch(val: string) { q.value = val; store.searchCity(val); }

function select(c:any) {
  // store.addSavedCity(c);
  router.push({ name: 'Detail', query: { lat: c.lat, lon: c.lon , state : c.name , country : c.country , opp : 0} });
}
</script>

<style scoped>
.search-page{
  padding:22px;
}
ul{ margin-top:12px; list-style:none; padding:0; }
li{ padding:12px 0px; border-bottom:1px solid #D4D4D4; cursor:pointer;}
span{
  opacity: 0.7;
}
.name{ font-weight:700; }
.country{ color:#6b7280; }
</style>
