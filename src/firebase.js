import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA5lQTk2e_goituW1lfT0DpC2-LcOMAyuA',
  authDomain: 'recom-c8d15.firebaseapp.com',
  projectId: 'recom-c8d15',
  storageBucket: 'recom-c8d15.appspot.com',
  messagingSenderId: '311336517911',
  appId: '1:311336517911:web:9854853203d517dd223752',
  measurementId: 'G-6QTGZPYX87'
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getFirestore(app)

export { auth, app, db }
