<script setup>
import { ref, computed } from 'vue';
import { useDataStore } from '@/stores/dataStore';

const dataStore = useDataStore()


const formacije = [
  { ime: '4-3-3', raspored: [3, 3, 4] },
  { ime: '4-4-2', raspored: [2, 4, 4] },
  { ime: '4-2-3-1', raspored: [1, 3, 2, 4] },
  { ime: '4-5-1', raspored: [1, 5, 4] },
]

const trenutnaFormacija = ref(formacije[0])

const linijeTerena = computed(() => trenutnaFormacija.value.raspored)

const aktivniIgraci = computed(() => {
  return dataStore.igraci.filter(function (igrac) { return igrac.status !== 'ozlijeden' })
})



const odabranaPozicija = ref(null)
const prikaziIzborIgraca = ref(false)


function otvoriIzborIgrača(id) {
  odabranaPozicija.value = id
  prikaziIzborIgraca.value = true
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
          <option :key="formacija" v-for="formacija in formacije" :value="formacija">{{ formacija.ime }}</option>
        </select>
      </div>

      <button type="button" class="bg-zuta text-black font-bold rounded-md p-1 hover:opacity-90 mr-5">
        Spremi Sastav
      </button>
    </div>
  </div>


  <div class="relative w-290 h-160 border-2 border-stroke rounded-2xl mx-auto mt-12 p-3">

    <img src="@/assets/teren.png" class="w-full h-full" />

    <div class="absolute inset-0 flex flex-col pt-3 pl-5 pr-5">

      <div v-for="(brojIgraca, i) in linijeTerena" :key="i" class="flex-1 w-full flex justify-around items-center">

        <div v-for="igrac in brojIgraca" :key="igrac"
          class="flex flex-col items-center border-3 border-gray-400 rounded-full">

          <div class="w-23 h-23 bg-fill flex flex-col rounded-full items-center justify-center cursor-pointer">
            <span class="text-white text-xs font-bold text-center p-1">Dodaj igrača</span>
          </div>
        </div>

      </div>

      <div class="h-1/5 w-full flex justify-around items-center pb-6">
        <div class="flex flex-col items-center border-3 border-gray-400 rounded-full">
          <div class="w-23 h-23 bg-fill flex flex-col rounded-full items-center justify-center cursor-pointer">
            <span class="text-white text-xs font-bold text-center p-1">Dodaj igrača</span>
          </div>
        </div>
      </div>

    </div>

  </div>


  <div class=" bg-fill border-2 border-stroke w-160 h-125 rounded-xl flex flex-col">
    <h1 class="text-white text-3xl font-bold text-center mb-6 mt-6"> Postavi igrača na poziciju </h1>

    <div class="flex flex-col gap-2 px-4 py-2 curso">

      <button v-for="igrac in aktivniIgraci" :key="igrac.id"
        class="w-full text-left text-white bg-black p-3 border border-stroke">
        #{{ igrac.dres }} {{ igrac.ime }} {{ igrac.prezime }}
      </button>

    </div>

    <div class="flex flex-row gap-4 pl-5 pr-5">

      <button class=" w-1/2 border border-red-600 bg-red-950 text-red-400 text-lg font-bold px-4 py-2 cursor-pointer
          hover:bg-red-900 hover:text-red-100 ">
        Ukloni igrača s ove pozicije
      </button>

      <button
        class=" w-1/2 border border-gray-400 bg-fill2 text-white text-lg font-bold px-4 py-2 cursor-pointer hover:text-tekst1 ">Zatvori</button>
    </div>
  </div>




</template>

<style scoped></style>