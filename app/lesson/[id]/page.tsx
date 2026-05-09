"use client"

import { useEffect, useState } from "react"

import { lessons } from "@/data/lessons"

export default function LessonPage() {

  const lesson = lessons[0]

  const [showQuiz, setShowQuiz] = useState(false)

  const [answered, setAnswered] = useState(false)

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowQuiz(true)
    }, 10000)

    return () => clearTimeout(timer)

  }, [])

  const handleAnswer = () => {

    setAnswered(true)

    setTimeout(() => {
      setShowQuiz(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">

      <div className="w-full max-w-5xl relative">

        <iframe
          className="w-full aspect-video rounded-2xl"
          src={`https://www.youtube.com/embed/${lesson.videoId}`}
          title="Lesson Video"
          allowFullScreen
        />

        {showQuiz && (

          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">

            <div className="bg-white p-8 rounded-2xl w-full max-w-md">

              <h2 className="text-2xl font-bold mb-6 text-center">
                {lesson.quiz.question}
              </h2>

              <div className="space-y-4">

                {lesson.quiz.options.map((option, index) => (

                  <button
                    key={index}
                    onClick={handleAnswer}
                    className="w-full bg-black text-white py-3 rounded-xl"
                  >
                    {option}
                  </button>

                ))}

              </div>

              {answered && (

                <p className="mt-6 text-center text-green-600 font-bold">
                  Answer Submitted
                </p>

              )}

            </div>

          </div>

        )}

      </div>

    </main>
  )
}