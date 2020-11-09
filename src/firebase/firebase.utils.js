import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDz-8JCDE81o_LQFZt72biMvQd9M9ELzZo",
    authDomain: "crwn-db-1389c.firebaseapp.com",
    databaseURL: "https://crwn-db-1389c.firebaseio.com",
    projectId: "crwn-db-1389c",
    storageBucket: "crwn-db-1389c.appspot.com",
    messagingSenderId: "1017522338356",
    appId: "1:1017522338356:web:122243746bd1d8a758e861"
  }

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }
    catch (error) {
      console.log('error creating user ', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;