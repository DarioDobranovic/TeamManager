import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import router from '@/router'

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

    user.value = auth.currentUser
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

      user.value = userCredential.user
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

  return { user, errorMessage, isError, registrirajTrenera, prijaviTrenera, odjaviTrenera }
})
