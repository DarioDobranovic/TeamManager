<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()

const email = ref('')
const lozinka = ref('')

const prijava = () => {
  authStore.prijaviTrenera(email.value, lozinka.value)
}

</script>

<template>
  <div class="min-h-screen w-full bg-black flex justify-center items-center p-4">

    `Glavni pravokutnik`
    <div
      class=" w-160.75 h-125.75 bg-fill border border-stroke rounded-xl pb-0 flex flex-col items-center justify-start">

      <img src="@/assets/logo.svg" class="w-20 h-20 mt-2 mb-1" />

      <h1 class="text-white text-3xl font-bold text-center mb-6 -mt-1.25"> Prijava Trenera </h1>

      <form @submit.prevent="prijava" class="space-y-6 w-full px-14">
        <div class="flex gap-4">
          <input v-model="email" type="email" placeholder="E-mail"
            class=" w-full bg-fill2 border border-stroke rounded-xl px-4 py-4 text-white" text-lg>
        </div>

        <div class="flex gap-4">
          <input v-model="lozinka" type="password" placeholder="Lozinka"
            class=" w-full bg-fill2 border border-stroke rounded-xl px-4 py-4 text-white text-lg">
        </div>


        <button type="submit"
          class="w-full bg-zuta text-black font-bold py-4 rounded-xl cursor-pointer hover:opacity-90 transition-opacity mt-2">Prijavi
          se</button>

        <div v-if="authStore.errorMessage" class="text-center text-sm font-medium mt-2">
          <span :class="authStore.isError ? 'text-rose-600' : 'text-emerald-600'">{{ authStore.errorMessage }}</span>
        </div>

        <div class="text-center mt-4">
          <RouterLink to="/registracija" class="text-zuta text-sm font-medium hover:opacity-90 cursor-pointer">Nemaš
            račun? registriraj se </RouterLink>
        </div>
      </form>

    </div>

  </div>
</template>