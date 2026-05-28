<script setup>
import { RouterView, useRoute } from 'vue-router';
import TheHeader from './views/TheHeader.vue';
const route = useRoute()

</script>

<template>
  <div class="min-h-screen bg-black flex flex-col">

    <TheHeader v-if="route.path !== '/' && route - path !== '/registracija'" />

    <RouterView />
  </div>
</template>

<style scoped></style>
