<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()

const logout = () => {
  authStore.odjaviTrenera()
}

</script>

<template>
  <header v-if="authStore.user"
    class="w-full bg-fill border-b-2 border-stroke px-6 py-3 flex items-center justify-between">

    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-tekst1 text-xs">
        TM
      </div>
      <RouterLink to="/sastav" class="text-white font-bold text-xl">Team Manager</RouterLink>
    </div>
    <nav class="flex items-center gap-6">
      <RouterLink to="/sastav" class="text-tekst1 font-bold hover:text-white text-sm cursor-pointer"
        active-class="text-zuta">
        <div class="flex flex-row items-center gap-2">
          <img src=" @/assets/sastav.png" class="w-5 h-5" />
          Sastav
        </div>
      </RouterLink>


      <RouterLink to="/igraci" class="text-tekst1 font-bold hover:text-white text-sm cursor-pointer"
        active-class="text-zuta">
        <div class="flex flex-row items-center gap-2">
          <img src=" @/assets/igraci.png" class="w-5 h-5" />
          Igrači
        </div>
      </RouterLink>


      <RouterLink to="/utakmice" class="text-tekst1 font-bold hover:text-white text-sm cursor-pointer"
        active-class="text-zuta">
        <div class="flex flex-row items-center gap-2">
          <img src=" @/assets/utakmice.png" class="w-5 h-5" />
          Utakmice
        </div>
      </RouterLink>

      <RouterLink to="/treninzi" class="text-tekst1 font-bold hover:text-white text-sm cursor-pointer"
        active-class="text-zuta">
        <div class="flex flex-row items-center gap-2">
          <img src=" @/assets/treninzi.png" class="w-5 h-5" />
          Treninzi
        </div>
      </RouterLink>


      <RouterLink to="/analitika" class="text-tekst1 font-bold hover:text-white text-sm cursor-pointer"
        active-class="text-zuta">
        <div class="flex flex-row items-center gap-2">
          <img src="@/assets/analitika.png" class="w-5 h-5" />
          <span>Analitika</span>
        </div>
      </RouterLink>
    </nav>

    <div class="flex items-center gap-5">
      <span class="text-gray-400 text-xs font-medium">
        {{ authStore.user?.displayName }}
      </span>
      <form @submit.prevent="logout">
        <button type="submit" class="border border-red-600 bg-red-950 text-red-400 text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer
          hover:bg-red-900 hover:text-red-100 ">
          Odjavi se
        </button>
      </form>
    </div>

  </header>
</template>