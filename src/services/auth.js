import { auth } from './firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { addNewUserDoc } from './firestore'

// Sign up with email and password

export const signUpWithEmailAndPassword = async (email, password) => {
  try {
    console.log('sign up')
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    // Signed up
    const user = userCredential.user
    console.log('User', user)

    //Create user document in firestore
    console.log('create userData doc')
    await addNewUserDoc(user.uid, email)

    return { isError: false, user }
  } catch (error) {
    console.log('sign up error', error)
    return { isError: true, error: error.message }
  }
}

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    console.log('login')
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
    // Logged In
    const user = userCredential.user
    return { isError: false, user }
  } catch (error) {
    console.log('login error')
    return { isError: true, error: error.message }
  }
}

export const logOutUser = async () => {
  try {
    console.log('logout')
    await signOut(auth)
    return { isError: false }
  } catch (error) {
    console.log('logout error')
    return { isError: true, error: error.message }
  }
}
