"use client"

import { useEffect, useState } from "react"

import {
  collection,
  addDoc,
} from "firebase/firestore"

import { db } from "@/lib/firebase"


export default function LessonPage() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [answered, setAnswered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuiz(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const handleAnswer = async () => {
    try {
      setAnswered(true)

      await addDoc(collection(db, "scores"), {
        student: "test user",
        score: 10,
        createdAt: new Date(),
      })

      console.log("Score saved successfully")

      setTimeout(() => {
        setShowQuiz(false)
      }, 1000)

    } catch (error) {
      console.error("Firestore Error:", error)
    }
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center relative p-4">
  <div className="w-full max-w-5xl aspect-video relative">
    <iframe
      className="w-full h-full rounded-2xl"
      src="https://www.youtube.com/embed/SWDID3p3QKw"
      title="Lesson"
      allowFullScreen
    />

    {showQuiz && (
      <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6 text-black">
            Quiz Time!
          </h2>
          <p className="mb-6 text-gray-700">
            Did you understand the lesson?
          </p>
          <button
            onClick={handleAnswer}
            disabled={answered}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            {answered ? "Submitted" : "Submit Answer"}
          </button>
        </div>
      </div>
    )}
  </div>
</main>
  )
}