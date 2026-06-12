<script setup>
import { ref } from 'vue'
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()

const prikaziFormuZaIgraca = ref(false)
const uredivanjeIgraca = ref(false)

const pocetniIgrac = {
  id: null,
  dres: '',
  ime: '',
  prezime: '',
  pozicija: 'Vezni',
  godine: '',
  vrijednost: '',
  status: 'aktivan',
  golovi: 0,
  asistencije: 0,
}

const igracForma = ref({
  id: pocetniIgrac.id,
  dres: pocetniIgrac.dres,
  ime: pocetniIgrac.ime,
  prezime: pocetniIgrac.prezime,
  pozicija: pocetniIgrac.pozicija,
  godine: pocetniIgrac.godine,
  vrijednost: pocetniIgrac.vrijednost,
  status: pocetniIgrac.status,
  golovi: pocetniIgrac.golovi,
  asistencije: pocetniIgrac.asistencije,
})

function otvoriFormuZaDodavanjeIgraca() {
  uredivanjeIgraca.value = false

  igracForma.value = {
    id: pocetniIgrac.id,
    dres: pocetniIgrac.dres,
    ime: pocetniIgrac.ime,
    prezime: pocetniIgrac.prezime,
    pozicija: pocetniIgrac.pozicija,
    godine: pocetniIgrac.godine,
    vrijednost: pocetniIgrac.vrijednost,
    status: pocetniIgrac.status,
    golovi: pocetniIgrac.golovi,
    asistencije: pocetniIgrac.asistencije,
  }

  prikaziFormuZaIgraca.value = true
}

function otvoriFormuZaUredivanjeIgraca(igrac) {
  uredivanjeIgraca.value = true

  igracForma.value = {
    id: igrac.id,
    dres: igrac.dres,
    ime: igrac.ime,
    prezime: igrac.prezime,
    pozicija: igrac.pozicija,
    godine: igrac.godine,
    vrijednost: igrac.vrijednost,
    status: igrac.status,
    golovi: igrac.golovi,
    asistencije: igrac.asistencije,
  }

  prikaziFormuZaIgraca.value = true
}

function zatvoriFormuZaIgraca() {
  prikaziFormuZaIgraca.value = false
  uredivanjeIgraca.value = false

  igracForma.value = {
    id: pocetniIgrac.id,
    dres: pocetniIgrac.dres,
    ime: pocetniIgrac.ime,
    prezime: pocetniIgrac.prezime,
    pozicija: pocetniIgrac.pozicija,
    godine: pocetniIgrac.godine,
    vrijednost: pocetniIgrac.vrijednost,
    status: pocetniIgrac.status,
    golovi: pocetniIgrac.golovi,
    asistencije: pocetniIgrac.asistencije,
  }
}

async function spremiIgraca() {
  const igracZaSpremanje = {
    id: igracForma.value.id,
    dres: igracForma.value.dres,
    ime: igracForma.value.ime,
    prezime: igracForma.value.prezime,
    pozicija: igracForma.value.pozicija,
    godine: igracForma.value.godine,
    vrijednost: igracForma.value.vrijednost,
    status: igracForma.value.status,
    golovi: igracForma.value.golovi,
    asistencije: igracForma.value.asistencije,
  }

  if (uredivanjeIgraca.value === true) {
    for (let i = 0; i < dataStore.igraci.length; i++) {
      if (dataStore.igraci[i].id === igracZaSpremanje.id) {
        dataStore.igraci[i] = igracZaSpremanje
      }
    }
  } else {
    let najveciId = 0

    for (let i = 0; i < dataStore.igraci.length; i++) {
      if (dataStore.igraci[i].id > najveciId) {
        najveciId = dataStore.igraci[i].id
      }
    }

    igracZaSpremanje.id = najveciId + 1
    dataStore.igraci.push(igracZaSpremanje)
  }

  await dataStore.spremiPodatke()
  zatvoriFormuZaIgraca()
}

async function obrisiIgraca(id) {
  for (let i = 0; i < dataStore.igraci.length; i++) {
    if (dataStore.igraci[i].id === id) {
      dataStore.igraci.splice(i, 1)
      await dataStore.spremiPodatke()
    }
  }
}
</script>

<template>
  <div class="w-full max-w-336.5 mx-auto mt-5 px-4">
    <div class="w-full h-28.5 bg-fill border border-stroke rounded-xl flex items-center justify-between px-6 mb-5">
      <h1 class="text-white text-3xl font-bold">
        Registar Nogometaša
      </h1>

      <button @click="otvoriFormuZaDodavanjeIgraca"
        class="bg-zuta text-black font-bold p-2 rounded-md text-xs cursor-pointer hover:bg-amber-200">
        Dodaj igrača
      </button>
    </div>

    <div class="w-9/10 h-148 flex flex-col border border-stroke rounded-t-xl rounded-b-xl overflow-hidden mx-auto mt-8">
      <div class="flex bg-fill2 border-b border-stroke text-tekst1 text-xs font-bold uppercase px-5 py-4">
        <div class="flex-1/8">
          Dres
        </div>

        <div class="flex-1/8">
          Ime i Prezime
        </div>

        <div class="flex-1/8">
          Pozicija
        </div>

        <div class="flex-1/8 text-center">
          Godine
        </div>

        <div class="flex-1/8 text-right">
          Vrijednost
        </div>

        <div class="flex-1/8 text-center">
          Status
        </div>

        <div class="flex-1/8 text-center">
          Gol/Ast
        </div>

        <div class="flex-1/8 text-right mr-3">
          Akcije
        </div>
      </div>

      <div class="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div class="flex flex-col">
          <div v-for="igrac in dataStore.igraci" :key="igrac.id"
            class="flex bg-fill border border-stroke hover:bg-fill2 text-xs font-bold px-5 py-4 items-center">
            <div class="flex-1 text-zuta">
              {{ igrac.dres }}
            </div>

            <div class="flex-1 text-tekst1">
              {{ igrac.ime }} {{ igrac.prezime }}
            </div>

            <div v-if="igrac.pozicija === 'Golman'" class="flex-1 text-tekst1">
              Gk
            </div>
            <div v-else-if="igrac.pozicija === 'Branič'" class="flex-1 text-tekst1">
              Def
            </div>
            <div v-else-if="igrac.pozicija === 'Vezni'" class="flex-1 text-tekst1">
              Mid
            </div>
            <div v-else-if="igrac.pozicija === 'Napadač'" class="flex-1 text-tekst1">
              Att
            </div>
            <div v-else class="flex-1 text-tekst1">
              {{ igrac.pozicija }}
            </div>

            <div class="flex-1 text-center text-tekst1">
              {{ igrac.godine }}
            </div>

            <div class="flex-1 text-right text-zelena">
              {{ igrac.vrijednost }} €
            </div>

            <div v-if="igrac.status === 'aktivan'" class="flex-1 text-center text-tekst1">
              Spreman
            </div>
            <div v-else-if="igrac.status === 'ozlijeden'" class="flex-1 text-center text-tekst1">
              Ozljeđen
            </div>
            <div v-else class="flex-1 text-center text-tekst1">
              {{ igrac.status }}
            </div>

            <div class="flex-1 text-center text-tekst1">
              {{ igrac.golovi }}/{{ igrac.asistencije }}
            </div>

            <div class="flex-1 text-right text-white">
              <div class="flex justify-end items-center gap-2 ml-18">
                <button @click="otvoriFormuZaUredivanjeIgraca(igrac)" class="cursor-pointer hover:opacity-75">
                  <img src="@/assets/uredi.png" alt="Uredi" class="w-12 h-5 object-contain">
                </button>

                <button @click="obrisiIgraca(igrac.id)" class="cursor-pointer hover:opacity-75">
                  <img src="@/assets/smece.png" alt="Obriši" class="w-12 h-5 object-contain">
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="prikaziFormuZaIgraca" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <form @submit.prevent="spremiIgraca"
        class="w-full max-w-170 bg-fill border-6 border-stroke rounded-5xl p-12 flex flex-col gap-4">
        <h2 class="text-white text-3xl font-bold mb-5">
          {{ uredivanjeIgraca ? 'Uredi Nogometaša' : 'Dodaj Nogometaša' }}
        </h2>

        <div class="flex gap-4">
          <input v-model="igracForma.ime" type="text" placeholder="Ime" required
            class="w-1/2 bg-fill2 border border-stroke rounded-lg px-3 py-4 text-white text-base font-bold placeholder:text-tekst1 outline-none focus:border-zuta">

          <input v-model="igracForma.prezime" type="text" placeholder="Prezime" required
            class="w-1/2 bg-fill2 border border-stroke rounded-lg px-3 py-4 text-white text-base font-bold placeholder:text-tekst1 outline-none focus:border-zuta">
        </div>

        <div class="flex gap-4">
          <input v-model="igracForma.dres" type="number" placeholder="Broj dresa" required
            class="w-1/3 bg-fill2 border border-stroke rounded-lg px-3 py-4 text-white text-base font-bold placeholder:text-tekst1 outline-none focus:border-zuta">

          <input v-model="igracForma.godine" type="number" placeholder="Godine" required
            class="w-1/3 bg-fill2 border border-stroke rounded-lg px-3 py-4 text-white text-base font-bold placeholder:text-tekst1 outline-none focus:border-zuta">

          <input v-model="igracForma.vrijednost" type="number" placeholder="Vrijednost" required
            class="w-1/3 bg-fill2 border border-stroke rounded-lg px-3 py-4 text-white text-base font-bold placeholder:text-tekst1 outline-none focus:border-zuta">
        </div>

        <div class="flex gap-4">
          <select v-model="igracForma.pozicija"
            class="w-1/2 bg-fill2 border border-stroke rounded-lg px-3 py-4 text-white text-base font-bold outline-none focus:border-zuta cursor-pointer">
            <option value="Golman">
              Golman
            </option>
            <option value="Branič">
              Branič
            </option>
            <option value="Vezni">
              Vezni
            </option>
            <option value="Napadač">
              Napadač
            </option>
          </select>

          <select v-model="igracForma.status"
            class="w-1/2 bg-fill2 border border-stroke rounded-lg px-3 py-4 text-white text-base font-bold outline-none focus:border-zuta cursor-pointer">
            <option value="aktivan">
              Spreman
            </option>
            <option value="ozlijeden">
              Ozljeđen
            </option>
          </select>
        </div>

        <div class="flex gap-4">
          <input v-model="igracForma.golovi" type="number" placeholder="Golovi"
            class="w-1/2 bg-fill2 border border-stroke rounded-lg px-3 py-4 text-white text-base font-bold placeholder:text-tekst1 outline-none focus:border-zuta">

          <input v-model="igracForma.asistencije" type="number" placeholder="Asistencije"
            class="w-1/2 bg-fill2 border border-stroke rounded-lg px-3 py-4 text-white text-base font-bold placeholder:text-tekst1 outline-none focus:border-zuta">
        </div>

        <div class="flex flex-row gap-4 mt-7">
          <button type="button" @click="zatvoriFormuZaIgraca"
            class="w-1/2 bg-fill2 border border-stroke rounded-lg text-tekst1 text-lg font-bold py-4 cursor-pointer hover:text-white hover:border-gray-500">
            Zatvori
          </button>

          <button type="submit"
            class="w-1/2 bg-zuta text-black text-lg font-bold py-4 rounded-lg cursor-pointer hover:opacity-90">
            Spremi Igrača
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
