import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const errorMessage = ref('')
  const isError = ref(false)

  async function registrirajTrenera(email, lozinka) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, lozinka)
      user.value = userCredential.user
      isError.value = false
      errorMessage.value = 'Korisnik je uspješno registriran!'

      setTimeout(() => {
        router.push('/sastav')
        errorMessage.value = ''
      }, 1500)
    } catch (error) {
      isError.value = true
      errorMessage.value = 'Greška prilikom registracije' + error.message
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
    }
  }

  return { user, errorMessage, isError, registrirajTrenera, prijaviTrenera }
})
