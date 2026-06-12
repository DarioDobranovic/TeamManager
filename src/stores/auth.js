import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
import router from '@/router'
import { useDataStore } from '@/stores/dataStore'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const errorMessage = ref('')
  const isError = ref(false)

  async function registrirajTrenera(email, lozinka, ime, prezime) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, lozinka)
      await updateProfile(userCredential.user, {
        displayName: ime + ' ' + prezime,
      })
      const dataStore = useDataStore()

      user.value = auth.currentUser
      await dataStore.spremiPodatke()
      isError.value = false
      errorMessage.value = 'Korisnik je uspješno registriran!'

      setTimeout(() => {
        router.push('/sastav')
        errorMessage.value = ''
      }, 1500)
    } catch (error) {
      isError.value = true
      errorMessage.value = 'Greška prilikom registracije' + error.message
      setTimeout(() => {
        errorMessage.value = ''
        isError.value = false
      }, 3500)
    }
  }

  async function prijaviTrenera(email, lozinka) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, lozinka)

      const dataStore = useDataStore()

      user.value = userCredential.user
      await dataStore.dohvatiPodatke()
      isError.value = false
      errorMessage.value = ''

      router.push('/sastav')
    } catch (error) {
      isError.value = true
      errorMessage.value = 'Greška prilikom prijavljivanja: ' + error.message
      setTimeout(() => {
        errorMessage.value = ''
        isError.value = false
      }, 3500)
    }
  }

  async function odjaviTrenera() {
  try {
    await signOut(auth)

    const dataStore = useDataStore()
    dataStore.ocistiPodatke()

    user.value = null
    isError.value = false
    errorMessage.value = ''

    router.push('/')
  } catch (error) {
    isError.value = true
    errorMessage.value = 'Greška prilikom odjave: ' + error.message

    setTimeout(() => {
      errorMessage.value = ''
      isError.value = false
    }, 3500)
  }
}


  function pratiPrijavu() {
    onAuthStateChanged(auth, async function (trenutniKorisnik) {
      const dataStore = useDataStore()

      user.value = trenutniKorisnik

      if (trenutniKorisnik) {
        await dataStore.dohvatiPodatke()
      }
    })
  }

  return { user, errorMessage, isError, registrirajTrenera, prijaviTrenera, odjaviTrenera, pratiPrijavu }
})
