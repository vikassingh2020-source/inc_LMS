import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDm_K7kctg0OfDqyhYoNg7XYB04D7fGrlM",
  authDomain: "interactive-lms-8a6bb.firebaseapp.com",
  projectId: "interactive-lms-8a6bb",
  storageBucket: "interactive-lms-8a6bb.firebasestorage.app",
  messagingSenderId: "574298387018",
  appId: "1:574298387018:web:dfcf7a1f83b95348c62cb3",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)