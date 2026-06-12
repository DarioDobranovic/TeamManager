import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth, db } from '@/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const useDataStore = defineStore('data', () => {
  const igraci = ref([])

  const formacije = ref([
    { ime: '4-3-3', raspored: [3, 3, 4], postava: {} },
    { ime: '4-4-2', raspored: [2, 4, 4], postava: {} },
    { ime: '4-2-3-1', raspored: [1, 3, 2, 4], postava: {} },
    { ime: '4-5-1', raspored: [1, 5, 4], postava: {} },
    { ime: '3-4-3', raspored: [3, 4, 3], postava: {} },
  ])

  const treninzi = ref([])

  const utakmice = ref([])

  async function spremiPodatke() {
    const dokument = doc(db, 'treneri', auth.currentUser.uid)

    await setDoc(dokument, {
      igraci: igraci.value,
      formacije: formacije.value,
      treninzi: treninzi.value,
      utakmice: utakmice.value,
    })
  }

  async function dohvatiPodatke() {
  const dokument = doc(db, 'treneri', auth.currentUser.uid)
  const spremljeniDokument = await getDoc(dokument)

  if (spremljeniDokument.exists()) {
    const spremljeniPodaci = spremljeniDokument.data()

    igraci.value = spremljeniPodaci.igraci
    formacije.value = spremljeniPodaci.formacije
    treninzi.value = spremljeniPodaci.treninzi
    utakmice.value = spremljeniPodaci.utakmice
  } else {
    ocistiPodatke()
    await spremiPodatke()
  }
}

  function ocistiPodatke() {
  igraci.value = []

  formacije.value = [
    { ime: '4-3-3', raspored: [3, 3, 4], postava: {} },
    { ime: '4-4-2', raspored: [2, 4, 4], postava: {} },
    { ime: '4-2-3-1', raspored: [1, 3, 2, 4], postava: {} },
    { ime: '4-5-1', raspored: [1, 5, 4], postava: {} },
    { ime: '3-4-3', raspored: [3, 4, 3], postava: {} },
  ]

  treninzi.value = []
  utakmice.value = []
}

  return {
    igraci,
    formacije,
    treninzi,
    utakmice,
    spremiPodatke,
    dohvatiPodatke,
    ocistiPodatke,
  }
})
