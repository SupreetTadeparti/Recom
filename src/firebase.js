import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getDoc,
  getFirestore,
  updateDoc,
  doc,
  collection,
  getDocs,
  serverTimestamp
} from 'firebase/firestore'
import { GoogleAuthProvider } from 'firebase/auth'

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

const provider = new GoogleAuthProvider()

// const collectionDocs = await getDocs(collection(db, "communities"));

// collectionDocs.forEach(d => {
//   updateDoc(doc(db, "communities", d.id), {
//     headsUpdateTime: serverTimestamp()
//   })
// })

// const userDocs = await getDocs(collection(db, 'users'))

// userDocs.forEach((d) => {
//   updateDoc(doc(db, 'users', d.id), {
//     voted: ['', '', '', '', '', ''],
//     votes: [0, 0, 0, 0, 0, 0]
//   })
// })

const getUserRef = () => doc(db, 'users', auth.currentUser.uid)

const getUser = async () => {
  const docRef = getUserRef()

  const doc = await getDoc(docRef)

  return doc.data()
}

const getCommunity = async () => {
  const user = await getUser()
  const communityDoc = await getDoc(doc(db, 'communities', user.community))
  return communityDoc.data()
}

export { auth, app, db, getUser, getCommunity, getUserRef, provider }
