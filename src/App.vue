<template>
  <div id="app">
    <div class="app-container">
      <!-- Loader -->
      <transition name="fade">
        <div v-if="store.loading" class="loader-overlay">
          <div class="loader"></div>
        </div>
      </transition>

      <!-- Error Toast -->
      <transition name="toast-slide">
        <div v-if="store.error" class="toast">
          <span>{{ store.error }}</span>
          <button class="toast-close" @click="store.error = ''">✖</button>
        </div>
      </transition>

      <!-- Main router outlet -->
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useWeatherStore } from './store/weatherStore';

const store = useWeatherStore();

onMounted(() => {
  store.loadSaved();
});

// Auto-hide error after 3 seconds
watch(() => store.error, (val) => {
  if (val) {
    setTimeout(() => {
      store.error = '';
    }, 3000);
  }
});
</script>

<style lang="scss">
#app {
  min-height: 90vh;
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
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
    position: relative;
  }
}

/* Loader Overlay */
.loader-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loader {
  width: 50px;
  height: 50px;
  border: 4px solid transparent;
  border-top: 4px solid #4f46e5;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  100% { transform: rotate(360deg); }
}

/* Toast Snackbar */
.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #faf0f1;
  color: black;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  min-width: 350px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  border : 1px solid #ead9d5;
  z-index: 2000;
}

.toast span {
  flex: 1;
}

.toast-close {
  background: transparent;
  border: none;
  color: rgba(0, 0, 0, 0.471);
  font-size: 14px;
  font-weight: 400px;
  margin-left: 8px;
  cursor: pointer;
}

/* Animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.toast-slide-enter-active, .toast-slide-leave-active {
  transition: all 0.3s ease;
}
.toast-slide-enter-from {
  transform: translate(-50%, 100%);
  opacity: 0;
}
.toast-slide-leave-to {
  transform: translate(-50%, 100%);
  opacity: 0;
}
</style>
