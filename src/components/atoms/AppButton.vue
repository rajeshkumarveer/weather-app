<template><button class="btn" :class="variant"><slot/></button></template>
<script setup lang="ts">
defineProps<{ variant?: 'primary' | 'ghost' }>();
</script>
<style scoped>
.btn{ padding:14px 20px; border-radius:12px; font-weight:700; }
.btn.primary{ background:#2e415f; color:white; border:none; }
.btn.ghost{ background:transparent; border:1px solid #ddd; }
</style>
