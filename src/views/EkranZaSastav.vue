<script setup>
import { ref, computed } from 'vue';
import { useDataStore } from '@/stores/dataStore';

const dataStore = useDataStore()



const trenutnaFormacija = ref(dataStore.formacije[0])
const postava = computed(() => trenutnaFormacija.value.postava)

const linijeTerena = computed(() => trenutnaFormacija.value.raspored)

const dostupniIgraci = computed(() => {
  return dataStore.igraci.filter(function (igrac) {
    if (igrac.status === 'ozlijeden') {
      return false
    }
    let vecNaTerenu = false

    for (let linija in trenutnaFormacija.value.postava) {
      for (let pozicija in trenutnaFormacija.value.postava[linija]) {
        let trenutniIgracNaTerenu =
          trenutnaFormacija.value.postava[linija][pozicija]

        if (trenutniIgracNaTerenu && trenutniIgracNaTerenu.id === igrac.id) {
          vecNaTerenu = true
        }
      }
    }

    return vecNaTerenu == false
  })
})



const odabranaPozicija = ref(null)
const prikaziIzborIgraca = ref(false)


function otvoriIzborIgrača(linijaIndex, igracIndex) {
  odabranaPozicija.value = { linija: linijaIndex, pozicija: igracIndex }
  prikaziIzborIgraca.value = true
}

async function postaviIgracaNaPoziciju(igrac) {
  if (odabranaPozicija.value) {
    const linija = odabranaPozicija.value.linija
    const pozicija = odabranaPozicija.value.pozicija

    if (!trenutnaFormacija.value.postava[linija]) {
      trenutnaFormacija.value.postava[linija] = {}
    }

    trenutnaFormacija.value.postava[linija][pozicija] = igrac
    await dataStore.spremiPodatke()
    prikaziIzborIgraca.value = false
  }
}

async function ukloniIgracaSaPozicije() {
  if (odabranaPozicija.value) {
    const linija = odabranaPozicija.value.linija
    const pozicija = odabranaPozicija.value.pozicija

    trenutnaFormacija.value.postava[linija][pozicija] = null
    await dataStore.spremiPodatke()
    prikaziIzborIgraca.value = false
  }
}

</script>

<template>
  <div
    class="w-full max-w-336.5 h-28.5 bg-fill border border-stroke rounded-xl flex items-center justify-between mx-auto mt-5">

    <div class="flex flex-col justify-center">
      <h1 class="text-white text-3xl font-bold ml-5">
        Taktička Postava Ekipe
      </h1>
      <p class="text-tekst1 text-xs mt-1 ml-5">
        Odaberi formaciju i klikni na poziciju za postavljanje igrača u prvih 11.
      </p>
    </div>

    <div class="flex items-center gap-3">
      <div class=" flex flex-row gap-3 border border-stroke p-1 pr-2 bg-black">
        <label for="select" class="text-white font-semibold">
          Formacija
        </label>
        <select id="select" v-model="trenutnaFormacija" class="font-bold text-white bg-black cursor-pointer">
          <option :key="formacija" v-for="formacija in dataStore.formacije" :value="formacija">{{ formacija.ime }}
          </option>
        </select>
      </div>
    </div>
  </div>


  <div class="relative w-290 h-160 border-2 border-stroke rounded-2xl mx-auto mt-12 p-3">

    <div v-if="prikaziIzborIgraca"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-fill border-2 border-gray-700 w-160 h-125 rounded-xl flex flex-col gap-2">
      <h1 class="text-white text-3xl font-bold text-center mb-6 mt-6">
        Postavi igrača na poziciju
      </h1>

      <div
        class="flex-1 overflow-y-auto px-4 py-2 pb-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">

        <div class="flex flex-col gap-2">

          <button v-for="(igrac, i) in dostupniIgraci" :key="igrac.id" @click="postaviIgracaNaPoziciju(igrac)"
            class="w-full text-left text-gray-300 font-bold bg-fill2 p-3 border-3 rounded-md border-stroke cursor-pointer hover:bg-gray-800 hover:text-white">
            #{{ i + 1 }} {{ igrac.ime }} {{ igrac.prezime }}
          </button>

        </div>

      </div>

      <div class="flex-none flex flex-row gap-4 pl-5 pr-5 mt-3 mb-5">

        <button @click="ukloniIgracaSaPozicije" class="w-1/2 border border-red-600 bg-red-950 text-red-400 text-lg font-bold px-4 py-1  cursor-pointer
      hover:bg-red-900 hover:text-red-100">
          Ukloni igrača s ove pozicije
        </button>

        <button @click="prikaziIzborIgraca = false"
          class="w-1/2 border border-gray-400 bg-fill2 text-white text-lg font-bold px-4 py-1 cursor-pointer hover:text-tekst1">
          Zatvori
        </button>

      </div>
    </div>





    <img src="@/assets/teren.png" class="w-full h-full" />

    <div class="absolute inset-0 flex flex-col pt-3 pl-5 pr-5">

      <div v-for="(brojIgraca, i) in linijeTerena" :key="i" class="flex-1 w-full flex justify-around items-center">

        <div v-for="igrac in brojIgraca" :key="igrac"
          class="flex flex-col items-center border-3 border-gray-400 rounded-full">

          <div @click="otvoriIzborIgrača(i, igrac)"
            class="w-23 h-23 bg-fill flex flex-col rounded-full items-center justify-center cursor-pointer">

            <div class="flex flex-col justify-center items-center" v-if="postava[i]?.[igrac]">
              <span class="text-zuta text-xl font-bold">
                {{ postava[i][igrac].dres }}
              </span>
              <span class="text-white text-xs font-bold uppercase text-center px-1 mt-0.5">
                {{ postava[i][igrac].prezime }}
              </span>
            </div>
            <span v-else class="text-white text-xs font-bold text-center p-1">
              Dodaj igrača
            </span>
          </div>
        </div>

      </div>

      <div class="h-1/5 w-full flex justify-around items-center pb-6">
        <div @click="otvoriIzborIgrača('golman', 0)"
          class="flex flex-col items-center border-3 border-gray-400 rounded-full">
          <div class="w-23 h-23 bg-fill flex flex-col rounded-full items-center justify-center cursor-pointer">
            <div v-if="postava['golman']?.[0]" class="flex flex-col justify-center items-center">
              <span class="text-zuta text-xl font-bold">
                {{ postava['golman'][0].dres }}
              </span>
              <span class="text-white text-xs font-bold uppercase text-center px-1 mt-0.5">
                {{ postava['golman'][0].prezime }}
              </span>
            </div>
            <span v-else class="text-white text-xs font-bold text-center p-1">Dodaj igrača</span>
          </div>
        </div>
      </div>

    </div>

  </div>


</template>

<style scoped></style>