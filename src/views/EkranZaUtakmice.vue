<script setup>
import { ref } from 'vue'
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()

const prikaziFormuZaUtakmicu = ref(false)

const pocetnaUtakmica = {
  id: null,
  protivnickiKlub: '',
  nasiGolovi: '',
  protivnickiGolovi: '',
  mjestoUtakmice: '',
  datumUtakmice: '',
  ocjeneIgraca: [],
}

const utakmicaForma = ref({
  id: pocetnaUtakmica.id,
  protivnickiKlub: pocetnaUtakmica.protivnickiKlub,
  nasiGolovi: pocetnaUtakmica.nasiGolovi,
  protivnickiGolovi: pocetnaUtakmica.protivnickiGolovi,
  mjestoUtakmice: pocetnaUtakmica.mjestoUtakmice,
  datumUtakmice: pocetnaUtakmica.datumUtakmice,
  ocjeneIgraca: pocetnaUtakmica.ocjeneIgraca,
})

function otvoriFormuZaUtakmicu() {
  utakmicaForma.value = {
    id: pocetnaUtakmica.id,
    protivnickiKlub: pocetnaUtakmica.protivnickiKlub,
    nasiGolovi: pocetnaUtakmica.nasiGolovi,
    protivnickiGolovi: pocetnaUtakmica.protivnickiGolovi,
    mjestoUtakmice: pocetnaUtakmica.mjestoUtakmice,
    datumUtakmice: pocetnaUtakmica.datumUtakmice,
    ocjeneIgraca: pocetnaUtakmica.ocjeneIgraca,
  }

  prikaziFormuZaUtakmicu.value = true
}

function zatvoriFormuZaUtakmicu() {
  prikaziFormuZaUtakmicu.value = false

  utakmicaForma.value = {
    id: pocetnaUtakmica.id,
    protivnickiKlub: pocetnaUtakmica.protivnickiKlub,
    nasiGolovi: pocetnaUtakmica.nasiGolovi,
    protivnickiGolovi: pocetnaUtakmica.protivnickiGolovi,
    mjestoUtakmice: pocetnaUtakmica.mjestoUtakmice,
    datumUtakmice: pocetnaUtakmica.datumUtakmice,
    ocjeneIgraca: pocetnaUtakmica.ocjeneIgraca,
  }
}

function spremiUtakmicu() {
  if (utakmicaForma.value.nasiGolovi < 0) {
    utakmicaForma.value.nasiGolovi = 0
  }

  if (utakmicaForma.value.protivnickiGolovi < 0) {
    utakmicaForma.value.protivnickiGolovi = 0
  }

  let najveciId = 0

  for (let i = 0; i < dataStore.utakmice.length; i++) {
    if (dataStore.utakmice[i].id > najveciId) {
      najveciId = dataStore.utakmice[i].id
    }
  }

  const ocjeneIgraca = []

  for (let i = 0; i < dataStore.igraci.length; i++) {
    if (i < 5) {
      const novaOcjena = Math.floor(Math.random() * 51 + 50) / 10

      ocjeneIgraca.push({
        id: dataStore.igraci[i].id,
        ime: dataStore.igraci[i].ime,
        prezime: dataStore.igraci[i].prezime,
        ocjena: novaOcjena,
      })
    }
  }

  const novaUtakmica = {
    id: najveciId + 1,
    protivnickiKlub: utakmicaForma.value.protivnickiKlub,
    nasiGolovi: utakmicaForma.value.nasiGolovi,
    protivnickiGolovi: utakmicaForma.value.protivnickiGolovi,
    mjestoUtakmice: utakmicaForma.value.mjestoUtakmice,
    datumUtakmice: utakmicaForma.value.datumUtakmice,
    ocjeneIgraca: ocjeneIgraca,
  }

  dataStore.utakmice.push(novaUtakmica)

  zatvoriFormuZaUtakmicu()
}

function obrisiUtakmicu(id) {
  for (let i = 0; i < dataStore.utakmice.length; i++) {
    if (dataStore.utakmice[i].id === id) {
      dataStore.utakmice.splice(i, 1)
    }
  }
}
</script>

<template>
  <div class="w-full max-w-336.5 mx-auto mt-5 px-4">
    <div class="w-full h-28.5 bg-fill border border-stroke rounded-xl flex items-center justify-between px-6 mb-5">
      <h1 class="text-white text-3xl font-bold">
        Povijest Utakmica i Rezultati
      </h1>

      <button @click="otvoriFormuZaUtakmicu"
        class="bg-zuta text-black font-bold p-2 rounded-md text-xs cursor-pointer hover:bg-amber-200">
        Zabilježi utakmicu
      </button>
    </div>
  </div>

  <div class="w-full max-w-336.5 mx-auto mt-10 px-4">
    <div class="flex flex-col items-center gap-10">
      <div v-for="utakmica in dataStore.utakmice" :key="utakmica.id"
        class="relative w-full max-w-250 bg-fill border border-stroke rounded-5xl overflow-visible">
        <button @click="obrisiUtakmicu(utakmica.id)"
          class="absolute -top-3 -right-3 bg-red-500 text-white w-9 h-9 rounded-full text-xl font-bold cursor-pointer hover:bg-red-400 z-10">
          ×
        </button>

        <div class="w-full flex justify-end px-8 pt-5">
          <p v-if="utakmica.nasiGolovi > utakmica.protivnickiGolovi" class="text-zelena text-xl font-bold">
            POBJEDA
          </p>

          <p v-else-if="utakmica.nasiGolovi === utakmica.protivnickiGolovi" class="text-zuta text-xl font-bold">
            REMI
          </p>

          <p v-else class="text-red-500 text-xl font-bold">
            PORAZ
          </p>
        </div>

        <div class="flex items-center justify-between px-28 py-10">
          <h2 class="text-white text-3xl font-bold">
            Naš klub
          </h2>

          <div class="bg-black px-10 py-3">
            <p class="text-white text-4xl font-bold">
              {{ utakmica.nasiGolovi }}:{{ utakmica.protivnickiGolovi }}
            </p>
          </div>

          <h2 class="text-white text-3xl font-bold">
            {{ utakmica.protivnickiKlub }}
          </h2>
        </div>

        <div class="mx-16 mb-12 bg-fill2 border border-stroke rounded-xl overflow-hidden">
          <div class="px-4 py-3 border-b border-stroke">
            <p class="text-tekst1 text-sm font-bold">
              Ocjene igrača na meču:
            </p>
          </div>

          <div v-for="ocjenaIgraca in utakmica.ocjeneIgraca" :key="ocjenaIgraca.id"
            class="flex justify-between px-12 py-3 border-b border-stroke text-sm font-bold">
            <p class="text-tekst1">
              {{ ocjenaIgraca.ime }} {{ ocjenaIgraca.prezime }}
            </p>

            <p class="text-zuta">
              {{ ocjenaIgraca.ocjena }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="prikaziFormuZaUtakmicu" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
    <div class="bg-fill border-6 border-stroke w-160 rounded-5xl flex flex-col gap-2 p-12">
      <h1 class="text-white text-3xl font-bold mb-6">
        Unos Odigrane Utakmice
      </h1>

      <form @submit.prevent="spremiUtakmicu" class="space-y-4 w-full">
        <div class="flex gap-4">
          <input v-model="utakmicaForma.protivnickiKlub" type="text" placeholder="Protivnički klub" required
            class="w-full bg-fill2 border border-stroke rounded-lg px-3 py-4 text-white text-base font-bold placeholder:text-tekst1 outline-none focus:border-zuta">
        </div>

        <div class="flex gap-4">
          <input v-model="utakmicaForma.nasiGolovi" type="number" min="0" placeholder="Zabili smo" required
            class="w-1/2 bg-fill2 border border-stroke rounded-lg px-3 py-4 text-white text-base font-bold placeholder:text-tekst1 outline-none focus:border-zuta text-center">

          <input v-model="utakmicaForma.protivnickiGolovi" type="number" min="0" placeholder="Primili smo" required
            class="w-1/2 bg-fill2 border border-stroke rounded-lg px-3 py-4 text-white text-base font-bold placeholder:text-tekst1 outline-none focus:border-zuta text-center">
        </div>

        <div class="flex gap-4">
          <select v-model="utakmicaForma.mjestoUtakmice" required
            class="w-1/2 bg-fill2 border border-stroke rounded-lg px-3 py-4 text-white text-base font-bold outline-none focus:border-zuta cursor-pointer text-center">
            <option value="" disabled>
              Mjesto
            </option>

            <option value="Domaći">
              Domaći
            </option>

            <option value="Gosti">
              Gosti
            </option>
          </select>

          <input v-model="utakmicaForma.datumUtakmice" type="date" required
            class="w-1/2 bg-fill2 border border-stroke rounded-lg px-3 py-4 text-white text-base font-bold placeholder:text-tekst1 outline-none focus:border-zuta text-center">
        </div>

        <div class="flex flex-row gap-4 mt-8">
          <button type="button" @click="zatvoriFormuZaUtakmicu"
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