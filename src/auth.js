import {
  doc,
  collection,
  setDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  where,
  query
} from 'firebase/firestore'
import { db, auth, provider, storage } from '@/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import router from './router/index'
import { signInWithPopup } from 'firebase/auth'
import { uploadBytes, ref } from 'firebase/storage'

const signIn = async (usernameEmail, password) => {
  try {
    // Sign in with email
    await signInWithEmailAndPassword(auth, usernameEmail, password)
    router.push({ path: '/home', replace: true })
  } catch (e) {
    if (e.code === 'auth/invalid-email') {
      // Sign in after extracting email from user
      const querySnapshot = await getDocs(collection(db, 'users'))

      for (let doc of querySnapshot.docs) {
        doc = doc.data()
        if (doc.username === usernameEmail) {
          try {
            await signInWithEmailAndPassword(auth, doc.email, password)
            router.push('/home')
            break
          } catch (e) {
            return e.message
          }
        }
      }
      return "User with specified username or email doesn't exist"
    } else {
      return e.message
    }
  }
}

const signUp = async (username, email, password, confirmPassword) => {
  // Validation
  if (password !== confirmPassword) {
    return 'Passwords do not match!'
  }

  const querySnapshot = await getDocs(collection(db, 'users'))

  for (const userDoc of querySnapshot.docs) {
    if (userDoc.username === username || userDoc.email == email) {
      return 'Username or Email is already in use'
    }
  }

  // Sign up
  try {
    await createUserWithEmailAndPassword(auth, email, password)
  } catch (e) {
    if (e.code === 'auth/invalid-email') return `Invalid email`
  }

  return ''
}

const createUser = async (username, email, name, community, photo = null) => {
  try {
    if (photo !== null) {
      const storageRef = ref(storage, name.toLowerCase().replace(' ', '_'))
      await uploadBytes(storageRef, photo)
    }

    // Save user to db
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      id: auth.currentUser.uid,
      photo: photo !== null,
      username: username,
      email: email,
      community: community.id,
      fullname: name,
      candidate: 'NA',
      // [President, Vice President, Treasurer, Secretary, Event Coordinator, Grievance Officer]
      votes: [0, 0, 0, 0, 0, 0],
      voted: ['', '', '', '', '', '']
    })
    // Save user to community
    await updateDoc(doc(db, 'communities', community.id), {
      members: arrayUnion(auth.currentUser.uid)
    })

    router.go()
  } catch (e) {
    return `Error adding document: ${e}`
  }
}

const googleSignIn = async (username, email, fullname) => {
  try {
    const res = await signInWithPopup(auth, provider)

    const q = query(collection(db, 'users'), where('email', '==', res.user.email))
    const userDocs = await getDocs(q)

    if (userDocs.docs.length === 0) {
      username.value = res.user.email.split('@')[0]
      email.value = res.user.email
      fullname.value = res.user.displayName
      return 2
    }

    router.push('/home')

    return 1
  } catch (e) {
    return e.message
  }
}

export { signIn, signUp, createUser, googleSignIn }
