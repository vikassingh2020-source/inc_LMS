"use client"

import {
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"

import { auth } from "@/lib/firebase"

import { useRouter } from "next/navigation"

export default function Home() {

  const router = useRouter()

  const login = async () => {

    const provider =
      new GoogleAuthProvider()

    try {

      await signInWithPopup(
        auth,
        provider
      )

      router.push("/dashboard")

    } catch (error) {

      console.error(
        "Login Error:",
        error
      )
    }
  }

  return (

    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-full max-w-md">

        <h1 className="text-4xl font-bold mb-4">
          Interactive LMS
        </h1>

        <p className="text-gray-600 mb-8">
          Learn interactively through videos,
          quizzes and real-world thinking.
        </p>

        <button
          onClick={login}
          className="w-full bg-black text-white py-3 rounded-xl"
        >
          Login with Google
        </button>

      </div>

    </main>
  )
}