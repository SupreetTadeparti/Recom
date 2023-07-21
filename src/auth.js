import { doc, collection, setDoc, getDocs, updateDoc, arrayUnion } from 'firebase/firestore'
import { db, auth, provider } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import router from './router/index'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

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

const signUp = async (username, email, password, confirmPassword, name, community) => {
  if (password !== confirmPassword) {
    return 'Passwords do not match!'
  }

  const querySnapshot = await getDocs(collection(db, 'users'))

  for (const userDoc of querySnapshot.docs) {
    if (userDoc.username === username || userDoc.email == email) {
      return 'Username or Email is already in use'
    }
  }

  try {
    // Sign up
    await createUserWithEmailAndPassword(auth, email, password)
    try {
      // Save user to db
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        id: auth.currentUser.uid,
        photo: false,
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
  } catch (e) {
    return `Something went wrong with sign up: ${e}`
  }
}

const googleSignIn = async () => {
  try {
    await signInWithPopup(auth, provider)
    router.push({ path: '/home', replace: true })
  } catch (e) {
    console.log(e.message)
  }
}

export { signIn, signUp, googleSignIn }
