"use client"

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function Home() {
  const login = async () => {
    const provider = new GoogleAuthProvider()

    try {
      await signInWithPopup(auth, provider)
      alert("Login successful")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6">
          Interactive LMS
        </h1>

        <button
          onClick={login}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Login with Google
        </button>
      </div>
    </main>
  )
}