import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Tvoji točni podaci iz Firebase konzole
const firebaseConfig = {
  apiKey: 'AIzaSyDYmtFprGEYSiKcJQtuQi9C4oRKnXVKfac',
  authDomain: 'teammanager-680db.firebaseapp.com',
  projectId: 'teammanager-680db',
  storageBucket: 'teammanager-680db.firebasestorage.app',
  messagingSenderId: '780690672073',
  appId: '1:780690672073:web:671daf1d7e0dbdf3d74018',
}

const app = initializeApp(firebaseConfig)
// Inicijalizacija servisa
const auth = getAuth(app) // auth instanca
const db = getFirestore(app) // database instanca
// Izvoz servisa
export { auth, db }
