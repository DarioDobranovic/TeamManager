<script setup>
import { ref } from 'vue';

const ime = ref('')
const prezime = ref('')
const email = ref('')
const lozinka = ref('')

</script>

<template>
  <div class="min-h-screen w-full bg-black flex justify-center items-center p-4">

    `Glavni pravokutnik`
    <div
      class=" w-160.75 h-125.75 bg-fill border border-stroke rounded-xl p-3 pb-0 flex flex-col items-center justify-start">

      <img src="@/assets/logo.svg" class="w-20 h-20 mt-2 mb-1" />

      <h1 class="text-white text-3xl font-bold text-center mb-6 -mt-1.25"> Registracija Trenera </h1>

      <form @submit.prevent class="space-y-4">
        <div class="flex gap-4">
          <input type="text" placeholder="Ime"
            class=" w-1/2 bg-fill2 border border-stroke rounded-xl px-4 py-3 text-white">
          <input type="text" placeholder="Prezime"
            class=" w-1/2 bg-fill2 border border-stroke rounded-xl px-4 py-3 text-white">
        </div>

        <div class="flex gap-4">
          <input type="email" placeholder="E-mail"
            class=" w-full bg-fill2 border border-stroke rounded-xl px-4 py-3 text-white">
        </div>

        <div class="flex gap-4">
          <input type="password" placeholder="Lozinka"
            class=" w-full bg-fill2 border border-stroke rounded-xl px-4 py-3 text-white">
        </div>


        <button type="submit"
          class="w-full bg-zuta text-black font-bold py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity mt-2">Napravi
          Račun</button>

        <div class="text-center mt-4">
          <RouterLink to="/" class="text-zuta text-sm font-medium hover:opacity-90 cursor-pointer">Imaš račun?
            Prijavi se </RouterLink>
        </div>
      </form>

    </div>

  </div>
</template>