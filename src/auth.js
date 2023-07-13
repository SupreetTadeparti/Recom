import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db, auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import router from './router/index'

const signIn = async (usernameEmail, password) => {
  try {
    await signInWithEmailAndPassword(auth, usernameEmail, password)
    router.push({ path: '/home', replace: true })
  } catch (e) {
    if (e.code === 'auth/invalid-email') {
      const querySnapshot = await getDocs(collection(db, 'users'))

      for (let doc of querySnapshot.docs) {
        doc = doc.data()
        if (doc.username === usernameEmail) {
          try {
            await signInWithEmailAndPassword(auth, doc.email, password)
            router.push('/home')
            break
          } catch (e) {
            console.log(e.message)
          }
        }
      }
    } else {
      console.log(e.message)
    }
  }
}

const signUp = async (username, email, password, confirmPassword) => {
  if (password !== confirmPassword) {
    console.log('Password do not match!')
    return
  }

  const querySnapshot = await getDocs(collection(db, 'users'))

  for (const doc of querySnapshot.docs) {
    if (doc.username === username || doc.email == email) {
      console.log('Username or Email is already in use')
      return
    }
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password)
    try {
      const doc = await addDoc(collection(db, 'users'), {
        id: auth.currentUser.uid,
        username: username,
        email: email
      })
      console.log('Document written with ID: ', doc.id)
    } catch (e) {
      console.log(`Error adding document: ${e}`)
    }
  } catch (e) {
    console.log('Something went wrong with sign up: ', error)
  }
}

export { signIn, signUp }
