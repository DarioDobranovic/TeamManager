<script setup>
import { computed } from 'vue'
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()

const igraciZaAnalitiku = computed(() => {
  if (!dataStore.igraci) {
    return []
  }

  return dataStore.igraci
})

const utakmiceZaAnalitiku = computed(() => {
  if (!dataStore.utakmice) {
    return []
  }

  return dataStore.utakmice
})

const ukupanBrojIgraca = computed(() => {
  return igraciZaAnalitiku.value.length
})

const ukupnaVrijednostIgraca = computed(() => {
  let zbrojVrijednostiIgraca = 0

  igraciZaAnalitiku.value.forEach(function (igrac) {
    zbrojVrijednostiIgraca += pretvoriVrijednostUBroj(igrac.vrijednost)
  })

  return zbrojVrijednostiIgraca
})

const ukupanBrojOzlijedenihIgraca = computed(() => {
  let brojOzlijedenihIgraca = 0

  igraciZaAnalitiku.value.forEach(function (igrac) {
    const statusIgraca = String(igrac.status).toLowerCase()

    if (statusIgraca.includes('ozlij') || statusIgraca.includes('ozlje')) {
      brojOzlijedenihIgraca++
    }
  })

  return brojOzlijedenihIgraca
})

const ukupanBrojOdigranihUtakmica = computed(() => {
  return utakmiceZaAnalitiku.value.length
})

const brojPobjeda = computed(() => {
  let brojPobjedaKluba = 0

  utakmiceZaAnalitiku.value.forEach(function (utakmica) {
    const brojZabijenihGolova = pretvoriVrijednostUBroj(utakmica.zabiliSmo)
    const brojPrimljenihGolova = pretvoriVrijednostUBroj(utakmica.primiliSmo)

    if (brojZabijenihGolova > brojPrimljenihGolova) {
      brojPobjedaKluba++
    }
  })

  return brojPobjedaKluba
})

const brojRemija = computed(() => {
  let brojRemijaKluba = 0

  utakmiceZaAnalitiku.value.forEach(function (utakmica) {
    const brojZabijenihGolova = pretvoriVrijednostUBroj(utakmica.zabiliSmo)
    const brojPrimljenihGolova = pretvoriVrijednostUBroj(utakmica.primiliSmo)

    if (brojZabijenihGolova === brojPrimljenihGolova) {
      brojRemijaKluba++
    }
  })

  return brojRemijaKluba
})

const brojPoraza = computed(() => {
  let brojPorazaKluba = 0

  utakmiceZaAnalitiku.value.forEach(function (utakmica) {
    const brojZabijenihGolova = pretvoriVrijednostUBroj(utakmica.zabiliSmo)
    const brojPrimljenihGolova = pretvoriVrijednostUBroj(utakmica.primiliSmo)

    if (brojZabijenihGolova < brojPrimljenihGolova) {
      brojPorazaKluba++
    }
  })

  return brojPorazaKluba
})

const tekstNajboljegStrijelca = computed(() => {
  const najboljiIgrac = dohvatiNajboljegIgracaPremaPolju('golovi')

  if (!najboljiIgrac) {
    return 'Nema (0)'
  }

  return najboljiIgrac.prezime + ' (' + pretvoriVrijednostUBroj(najboljiIgrac.golovi) + ')'
})

const tekstNajboljegAsistenta = computed(() => {
  const najboljiIgrac = dohvatiNajboljegIgracaPremaPolju('asistencije')

  if (!najboljiIgrac) {
    return 'Nema (0)'
  }

  return najboljiIgrac.prezime + ' (' + pretvoriVrijednostUBroj(najboljiIgrac.asistencije) + ')'
})

function dohvatiNajboljegIgracaPremaPolju(nazivPolja) {
  if (igraciZaAnalitiku.value.length === 0) {
    return null
  }

  let najboljiIgrac = igraciZaAnalitiku.value[0]

  igraciZaAnalitiku.value.forEach(function (igrac) {
    const trenutnaVrijednost = pretvoriVrijednostUBroj(igrac[nazivPolja])
    const najboljaVrijednost = pretvoriVrijednostUBroj(najboljiIgrac[nazivPolja])

    if (trenutnaVrijednost > najboljaVrijednost) {
      najboljiIgrac = igrac
    }
  })

  return najboljiIgrac
}

function pretvoriVrijednostUBroj(vrijednost) {
  if (vrijednost === '' || vrijednost === null || vrijednost === undefined) {
    return 0
  }

  return Number(vrijednost)
}

function formatirajVelikiBroj(vrijednost) {
  const tekstVrijednosti = String(vrijednost)
  let formatiranaVrijednost = ''
  let brojacZnamenki = 0

  for (let indeks = tekstVrijednosti.length - 1; indeks >= 0; indeks--) {
    formatiranaVrijednost = tekstVrijednosti[indeks] + formatiranaVrijednost
    brojacZnamenki++

    if (brojacZnamenki === 3 && indeks !== 0) {
      formatiranaVrijednost = ' ' + formatiranaVrijednost
      brojacZnamenki = 0
    }
  }

  return formatiranaVrijednost
}
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
          {{ formatirajVelikiBroj(ukupnaVrijednostIgraca) }} €
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
              {{ tekstNajboljegStrijelca }}
            </p>
          </div>

          <div class="flex items-center justify-between">
            <p class="text-tekst1 text-xl font-bold">
              Najbolji Asistent:
            </p>
            <p class="text-zuta text-xl font-bold text-right">
              {{ tekstNajboljegAsistenta }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
