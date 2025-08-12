<template>
  <div style="cursor: pointer;">
    <AppInput v-model="q" placeholder="Search for a city or airport" @enter="onSearch">
      <template #left><img width="18" height="18" src="/src/assets/Vector.svg" alt="user"/></template>
      <template #right>
        <button v-if="q" @click="clear"><img width="15" height="15" src="/src/assets/clear.svg" alt="user"/></button>
      </template>
    </AppInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppInput from '../atoms/AppInput.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const q = ref('');
const emit = defineEmits(['search']);
function onSearch(){ emit('search', q.value.trim()); }
function clear(){ q.value=''; emit('search',''); 
  router.push({ path: '/' }); }

</script>