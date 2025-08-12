<template>
  <div class="weather-card" @click="$emit('open')" :class="isDay ? 'weather-card-lightbg' : 'weather-card-darkbg'">
    <div class="weather-card-inner">
          <div class="left">
            <div class="title">{{ title }}</div>
            <div class="time">{{ subtitle }}</div>
          </div>
          <div class="right">
            <div class="temp">{{ Math.round(temp) }}°</div>
          </div>
    </div>
    <div class="weather-card-inner">
          <div class="left">
            <div class="desc">{{ description }}</div>
          </div>
        <div class="right">
          <div class="hi-lo">H:{{ Math.round(hi) }}° L:{{ Math.round(lo) }}°</div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { computed } from 'vue';
interface Props {
  title: string;
  subtitle: string;
  description: string;
  temp: number;
  hi: number;
  lo: number;
  bg?: string; // optional
  isDay: boolean
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.weather-card{
  padding:16px; border-radius:18px; cursor: pointer;
  color:white; margin-bottom:18px;
}
.weather-card-darkbg{
  // background: linear-gradient(180deg,#1f5f9f,#214f78); 
  background-image: url("/src/assets/weatherbg2.svg"); /* Relative path */
  background-repeat: no-repeat;
  background-size: cover;

}
.weather-card-lightbg{
  // background: linear-gradient(180deg,#6a9f1f,#417821); 
  background-image: url("/src/assets/weatherbg1.svg"); /* Relative path */
  background-repeat: no-repeat;
  background-size: cover;

}
.weather-card-inner{
  display:flex; justify-content:space-between; 
}
.left{ max-width:65%; }
.title{ font-size:28px; font-weight:800; }
.time{ font-size:14px; opacity:.85; margin-top:0px; }
.desc{ margin-top:0px; font-size:16px; }
.right{ text-align:right; }
.temp{ font-size:53px; font-weight:500; position: relative; top: -8px;  }
.hi-lo{ font-size:16px; opacity:.9; margin-top:0px; }
</style>
