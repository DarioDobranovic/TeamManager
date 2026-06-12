<script setup>
import { ref } from 'vue'
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()

const prikaziFormuZaTrening = ref(false)

const pocetniTrening = {
  id: null,
  vrstaTreninga: '',
  trajanjeTreninga: '',
  igrac: '',
}

const treningForma = ref({
  id: pocetniTrening.id,
  vrstaTreninga: pocetniTrening.vrstaTreninga,
  trajanjeTreninga: pocetniTrening.trajanjeTreninga,
  igrac: pocetniTrening.igrac,
})

function otvoriFormuZaTrening() {
  treningForma.value = {
    id: pocetniTrening.id,
    vrstaTreninga: pocetniTrening.vrstaTreninga,
    trajanjeTreninga: pocetniTrening.trajanjeTreninga,
    igrac: pocetniTrening.igrac,
  }

  prikaziFormuZaTrening.value = true
}

function zatvoriFormuZaTrening() {
  prikaziFormuZaTrening.value = false

  treningForma.value = {
    id: pocetniTrening.id,
    vrstaTreninga: pocetniTrening.vrstaTreninga,
    trajanjeTreninga: pocetniTrening.trajanjeTreninga,
    igrac: pocetniTrening.igrac,
  }
}

async function spremiTrening() {
  if (treningForma.value.trajanjeTreninga < 0) {
    treningForma.value.trajanjeTreninga = 0
  }

  let najveciId = 0

  for (let i = 0; i < dataStore.treninzi.length; i++) {
    if (dataStore.treninzi[i].id > najveciId) {
      najveciId = dataStore.treninzi[i].id
    }
  }

  const noviTrening = {
    id: najveciId + 1,
    vrstaTreninga: treningForma.value.vrstaTreninga,
    trajanjeTreninga: treningForma.value.trajanjeTreninga,
    igrac: treningForma.value.igrac,
  }

  dataStore.treninzi.push(noviTrening)
  await dataStore.spremiPodatke()

  zatvoriFormuZaTrening()
}

async function obrisiTrening(id) {
  for (let i = 0; i < dataStore.treninzi.length; i++) {
    if (dataStore.treninzi[i].id === id) {
      dataStore.treninzi.splice(i, 1)
      await dataStore.spremiPodatke()
    }
  }
}
</script>

<template>
  <div class="w-full max-w-336.5 mx-auto mt-5 px-4">
    <div class="w-full h-28.5 bg-fill border border-stroke rounded-xl flex items-center justify-between px-6 mb-5">
      <h1 class="text-white text-3xl font-bold">
        Plan i Raspored Treninga
      </h1>

      <button @click="otvoriFormuZaTrening"
        class="bg-zuta text-black font-bold p-2 rounded-md text-xs cursor-pointer hover:bg-amber-200">
        Zakaži trening
      </button>
    </div>
  </div>

  <div class="w-full max-w-336.5 mx-auto mt-15 px-4">
    <div class="flex flex-wrap gap-10">
      <div v-for="trening in dataStore.treninzi" :key="trening.id"
        class="relative bg-fill border-6 border-stroke w-100 rounded-xl flex flex-col gap-3 p-6">
        <button @click="obrisiTrening(trening.id)"
          class="absolute -top-4 -right-4 bg-red-500 text-white w-8 h-8 rounded-full text-xl font-bold cursor-pointer hover:bg-red-400">
          ×
        </button>

        <div class="bg-fill2 border border-stroke rounded-2xl flex items-center justify-between px-4 py-3">
          <p class="text-zuta text-sm font-bold uppercase">
            {{ trening.vrstaTreninga }}
          </p>

          <p class="text-tekst1 text-sm font-bold">
            {{ trening.trajanjeTreninga }} min
          </p>
        </div>

        <p class="text-tekst1 text-sm font-bold mt-1">
          Usmjeren na igrača:
        </p>

        <p class="text-white text-base font-bold">
          {{ trening.igrac }}
        </p>
      </div>
    </div>
  </div>

  <div v-if="prikaziFormuZaTrening" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
    <div class="bg-fill border-6 border-stroke w-160 h-125 rounded-5xl flex flex-col gap-2">
      <h1 class="text-white text-3xl font-bold mb-6 mt-10 px-14">
        Novi Trening
      </h1>

      <form @submit.prevent="spremiTrening" class="space-y-6 w-full px-14">
        <div class="flex gap-4">
          <input v-model="treningForma.vrstaTreninga" type="text" placeholder="Vrsta treninga" required
            class="w-full bg-fill2 border border-stroke rounded-xl px-4 py-4 text-white text-lg font-bold placeholder:text-tekst1 outline-none focus:border-zuta">
        </div>

        <div class="flex gap-4">
          <input v-model="treningForma.trajanjeTreninga" type="number" min="0" placeholder="Trajanje treninga" required
            class="w-full bg-fill2 border border-stroke rounded-xl px-4 py-4 text-white text-lg font-bold placeholder:text-tekst1 outline-none focus:border-zuta">
        </div>

        <div class="flex gap-4">
          <select v-model="treningForma.igrac" required
            class="w-full bg-fill2 border border-stroke rounded-xl px-4 py-4 text-white text-lg font-bold outline-none focus:border-zuta cursor-pointer">
            <option value="" disabled>
              Igrač
            </option>

            <option v-for="igrac in dataStore.igraci" :key="igrac.id" :value="igrac.ime + ' ' + igrac.prezime">
              {{ igrac.ime }} {{ igrac.prezime }}
            </option>
          </select>
        </div>

        <div class="flex-none flex flex-row gap-4 mt-8">
          <button type="button" @click="zatvoriFormuZaTrening"
            class="w-1/2 bg-fill2 border border-stroke rounded-lg text-tekst1 text-lg font-bold py-4 cursor-pointer hover:text-white hover:border-gray-500">
            Zatvori
          </button>

          <button type="submit"
            class="w-1/2 bg-zuta text-black text-lg font-bold py-4 rounded-lg cursor-pointer hover:bg-amber-200">
            Spremi i Generiraj
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>