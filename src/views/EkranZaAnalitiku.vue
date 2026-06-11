<script setup>
import { computed } from 'vue'
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()
const ukupanBrojIgraca = computed(() => {

  return dataStore.igraci.length

})

const ukupnaVrijednostIgraca = computed(() => {
  let zbrojVrijednostiIgraca = 0
  dataStore.igraci.forEach(function (igrac) {

    zbrojVrijednostiIgraca += igrac.vrijednost
  })
  return zbrojVrijednostiIgraca
})

const ukupanBrojOzlijedenihIgraca = computed(() => {
  let brojOzlijedenihIgraca = 0

  dataStore.igraci.forEach(function (igrac) {
    const statusIgraca = igrac.status.toLowerCase()

    if (statusIgraca.includes('ozlijeden')) {
      brojOzlijedenihIgraca++
    }
  })
  return brojOzlijedenihIgraca
})

const ukupanBrojOdigranihUtakmica = computed(() => {
  return dataStore.utakmice.length
})

const brojPobjeda = computed(() => {
  let brojac = 0
  dataStore.utakmice.forEach(function (utakmica) {
    if (utakmica.nasiGolovi > utakmica.protivnickiGolovi) brojac++
  })
  return brojac
})

const brojRemija = computed(() => {
  let brojac = 0
  dataStore.utakmice.forEach(function (utakmica) {
    if (utakmica.nasiGolovi === utakmica.protivnickiGolovi) brojac++
  })
  return brojac
})

const brojPoraza = computed(() => {
  let brojac = 0
  dataStore.utakmice.forEach(function (utakmica) {
    if (utakmica.nasiGolovi < utakmica.protivnickiGolovi) brojac++
  })
  return brojac
})

const najboljiStrijelac = computed(() => {
  let najbolji = null
  let najviseGolova = 0

  dataStore.igraci.forEach(function (igrac) {
    if (igrac.golovi > najviseGolova) {
      najviseGolova = igrac.golovi
      najbolji = igrac
    }
  })

  if (najbolji && najviseGolova > 0) {
    return najbolji.ime + ' ' + najbolji.prezime + ' (' + najviseGolova + ')'
  }
  return 'Nema golova'
})


const najboljiAsistent = computed(() => {
  let najbolji = null
  let najviseAsistencija = 0

  dataStore.igraci.forEach(function (igrac) {
    if (igrac.asistencije > najviseAsistencija) {
      najviseAsistencija = igrac.asistencije
      najbolji = igrac
    }
  })

  if (najbolji && najviseAsistencija > 0) {
    return najbolji.ime + ' ' + najbolji.prezime + ' (' + najviseAsistencija + ')'
  }
  return 'Nema asistencija'
})

</script>


<template>
  <div class="w-full max-w-294 mx-auto mt-18">
    <div class="grid grid-cols-4 gap-6">
      <div class="bg-fill border border-stroke rounded-xl h-24 flex flex-col justify-center pl-8">
        <p class="text-tekst1 text-xl font-bold uppercase">
          Ukupno igrača
        </p>
        <p class="text-white text-4xl font-bold leading-none mt-1">
          {{ ukupanBrojIgraca }}
        </p>
      </div>

      <div class="bg-fill border border-stroke rounded-xl h-24 flex flex-col justify-center pl-8">
        <p class="text-tekst1 text-xl font-bold uppercase">
          Vrijednost igrača
        </p>
        <p class="text-zelena text-3xl font-bold leading-none mt-2">
          {{ ukupnaVrijednostIgraca }} €
        </p>
      </div>

      <div class="bg-fill border border-stroke rounded-xl h-24 flex flex-col justify-center pl-8">
        <p class="text-tekst1 text-xl font-bold uppercase">
          Ozlijeđeni
        </p>
        <p class="text-red-500 text-4xl font-bold leading-none mt-1">
          {{ ukupanBrojOzlijedenihIgraca }}
        </p>
      </div>

      <div class="bg-fill border border-stroke rounded-xl h-24 flex flex-col justify-center pl-8">
        <p class="text-tekst1 text-xl font-bold uppercase">
          Odigrano utakmica
        </p>
        <p class="text-zuta text-4xl font-bold leading-none mt-1">
          {{ ukupanBrojOdigranihUtakmica }}
        </p>
      </div>
    </div>

    <div class="mt-18 flex justify-center gap-13">
      <div class="w-130 h-60 bg-fill border border-stroke rounded-5xl overflow-hidden">
        <div class="h-17 border-b border-stroke flex items-center justify-center">
          <h2 class="text-tekst1 text-xl font-bold">
            Odigrane utakmice
          </h2>
        </div>

        <div class="px-8 pt-7 flex flex-col gap-5">
          <div class="flex items-center justify-between">
            <p class="text-tekst1 text-xl font-bold">
              Pobjede:
            </p>
            <p class="text-zelena text-2xl font-bold">
              {{ brojPobjeda }}
            </p>
          </div>

          <div class="flex items-center justify-between">
            <p class="text-tekst1 text-xl font-bold">
              Remiji:
            </p>
            <p class="text-zuta text-2xl font-bold">
              {{ brojRemija }}
            </p>
          </div>

          <div class="flex items-center justify-between">
            <p class="text-tekst1 text-xl font-bold">
              Porazi:
            </p>
            <p class="text-red-500 text-2xl font-bold">
              {{ brojPoraza }}
            </p>
          </div>
        </div>
      </div>

      <div class="w-130 h-59 bg-fill border border-stroke rounded-5xl overflow-hidden">
        <div class="h-17 border-b border-stroke flex items-center justify-center">
          <h2 class="text-tekst1 text-xl font-bold">
            Timski rekorderi
          </h2>
        </div>

        <div class="px-9 pt-8 flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <p class="text-tekst1 text-xl font-bold">
              Najbolji Strijelac:
            </p>
            <p class="text-zuta text-xl font-bold text-right">
              {{ najboljiStrijelac }}
            </p>
          </div>

          <div class="flex items-center justify-between">
            <p class="text-tekst1 text-xl font-bold">
              Najbolji Asistent:
            </p>
            <p class="text-zuta text-xl font-bold text-right">
              {{ najboljiAsistent }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>