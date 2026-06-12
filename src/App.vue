<script setup>
import { RouterView, useRoute } from 'vue-router';
import TheHeader from './views/TheHeader.vue';
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

authStore.pratiPrijavu()

</script>

<template>
  <div class="min-h-screen bg-black flex flex-col">

    <TheHeader v-if="route.path !== '/' && route.path !== '/registracija'" />

    <RouterView />
  </div>
</template>

<style scoped></style>
