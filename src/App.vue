<template>
  <div id="app">
    <div class="app-container">
      <!-- Main router outlet -->
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
// We can put global logic here, like theme handling or store initialization
import { onMounted } from 'vue';
import { useWeatherStore } from './store/weatherStore';

const store = useWeatherStore();

onMounted(() => {
  // Load saved cities when app starts
  store.loadSaved();
});
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background-color: var(--bg, #ffffff);
  display: flex;
  flex-direction: column;
}
@media (min-width: 500px) {
.app-container {
  max-width: 450px;
  min-width: 450px;
  margin: 20px auto;
  border-radius: 20px;
  overflow: hidden;
  min-height: calc(100vh - 40px);
  background: #ffffff;
  box-shadow: 0 0 30px rgba(0,0,0,0.15);
}
}
</style>
