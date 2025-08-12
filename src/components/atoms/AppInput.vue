<template>
  <div class="app-input">
    <slot name="left"/>
    <input
      :placeholder="placeholder"
      v-model="model"
      @keyup="$emit('enter')"
      :aria-label="placeholder"
      v-autofocus
      ref="searchInput"
    />
    <slot name="right"/>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{ modelValue?: string; placeholder?: string }>();
const emit = defineEmits(['update:modelValue','enter']);

const model = ref(props.modelValue ?? '');
const searchInput = ref();

watch(model, v => emit('update:modelValue', v));

// 🔹 Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  model.value = newValue ?? '';
});

const route = useRoute(); 
onMounted(() => {
  if (route.path !== "/" && searchInput.value?.focus) {
    searchInput.value.focus();
  }
});
</script>

<style scoped lang="scss">
.app-input{ display:flex; align-items:center; gap:12px; padding:10px 12px; background:#f3f4f6; border-radius:10px; }
input{ border:0; outline:0; background:transparent; flex:1; font-size:16px; }
</style>
