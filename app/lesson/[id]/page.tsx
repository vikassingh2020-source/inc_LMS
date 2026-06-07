"use client"

import { use, useEffect, useRef, useState } from "react"
import YouTube from "react-youtube"
import { lessons } from "@/data/lessons"
import { auth, db } from "@/lib/firebase"

import {
  doc,
  setDoc,
} from "firebase/firestore"

export default function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const resolvedParams = use(params)

  const lesson = lessons.find(
    (item) =>
      item.id === Number(resolvedParams.id)
  )

  if (!lesson) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold">
          Lesson Not Found
        </h1>
      </main>
    )
  }

  const playerRef = useRef<any>(null)

  const interactionTriggered =
    useRef<number[]>([])

  const [currentInteraction,
    setCurrentInteraction] =
    useState<any>(null)

  const [completedInteractions,
    setCompletedInteractions] =
    useState<number[]>([])

  const [earnedPoints,
    setEarnedPoints] =
    useState<number[]>([])

  const [showFinalQuiz,
    setShowFinalQuiz] =
    useState(false)
const [currentFinalQuestionIndex,
  setCurrentFinalQuestionIndex] =
  useState(0)

const [finalQuizPoints,
  setFinalQuizPoints] =
  useState<number[]>([])


  const [moduleCompleted,
    setModuleCompleted] =
    useState(false)

  const onReady = (event: any) => {
    playerRef.current = event.target
  }

  useEffect(() => {

    const interval =
      setInterval(() => {

        if (!playerRef.current)
          return

        const currentTime =
          Math.floor(
            playerRef.current.getCurrentTime()
          )

        const interaction =
          lesson.interactions.find(
            (item) =>
              item.time === currentTime &&
              !interactionTriggered.current.includes(
                item.id
              )
          )

        if (interaction) {

          interactionTriggered.current.push(
            interaction.id
          )

          playerRef.current.pauseVideo()

          setCurrentInteraction(
            interaction
          )
        }

        const allInteractionsCompleted =
          completedInteractions.length ===
          lesson.interactions.length

        if (
          allInteractionsCompleted &&
          !showFinalQuiz &&
          !moduleCompleted &&
          lesson.finalQuizQuestions &&
currentTime >= lesson.finalQuizQuestions.time
        ) {

          setShowFinalQuiz(true)

          playerRef.current.pauseVideo()
        }

      }, 1000)

    return () =>
      clearInterval(interval)

  }, [
    completedInteractions,
    lesson,
    moduleCompleted,
    showFinalQuiz,
  ])

  const handleInteractionAnswer =
    (selectedIndex: number) => {

      if (!currentInteraction)
        return

      if (
        selectedIndex ===
        currentInteraction.correctAnswer
      ) {

        setEarnedPoints((prev) => [
          ...prev,
          10,
        ])
      }

      setCompletedInteractions(
        (prev) => [
          ...prev,
          currentInteraction.id,
        ]
      )

      setCurrentInteraction(null)

      playerRef.current.playVideo()
    }

    const handleFinalQuiz =
  async (selectedIndex: number) => {

    const currentQuestion =
      lesson.finalQuizQuestions.questions[
        currentFinalQuestionIndex
      ]

    let updatedFinalPoints =
      [...finalQuizPoints]

    if (
      selectedIndex ===
      currentQuestion.correctAnswer
    ) {
      updatedFinalPoints.push(10)
    }

    setFinalQuizPoints(updatedFinalPoints)

    const isLastQuestion =
      currentFinalQuestionIndex ===
      lesson.finalQuizQuestions.questions.length - 1

    if (!isLastQuestion) {

      setCurrentFinalQuestionIndex(
        prev => prev + 1
      )

      return
    }

    let interactionScore =
      earnedPoints.reduce(
        (sum, points) =>
          sum + points,
        0
      )

    let finalQuizScore =
      updatedFinalPoints.reduce(
        (sum, points) =>
          sum + points,
        0
      )

    let totalScore =
      interactionScore + finalQuizScore
  
try {

  const currentUser =
    auth.currentUser

  if (!currentUser) {

    alert("User not logged in")

    return
  }

  const progressRef = doc(
    db,
    "studentProgress",
    `${currentUser.uid}_module_${lesson.id}`
  )

  console.log("Attempting save...")

  await setDoc(progressRef, {
    userId: currentUser.uid,
    userName: currentUser.displayName,
    userEmail: currentUser.email,
    moduleId: lesson.id,
    courseId: lesson.courseId,
    moduleTitle: lesson.title,
    score: totalScore,
    completed: true,
    completedAt: new Date(),
  })

  console.log("Save successful")

} catch (error) {

  console.error(
    "Firestore Save Error:",
    error
  )

  alert(
    "Firestore Save Error. Check console."
  )

  return
}

setShowFinalQuiz(false)

setModuleCompleted(true)

alert(
  `Module Completed! Score: ${totalScore}`
)
  }
  return (

    <main className="min-h-screen bg-black flex items-center justify-center p-4">

      <div className="w-full max-w-5xl relative">

        <YouTube
          videoId={lesson.videoId}
          opts={{
            width: "100%",
            height: "600",
            playerVars: {
              autoplay: 1,
            },
          }}
          onReady={onReady}
        />

        {currentInteraction && (

          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">

            <div className="bg-white p-8 rounded-2xl w-full max-w-md">

              <h2 className="text-2xl font-bold mb-6 text-center">
                {currentInteraction.question}
              </h2>

              <div className="space-y-4">

                {currentInteraction.options.map(
                  (
                    option: string,
                    index: number
                  ) => (

                    <button
                      key={index}
                      onClick={() =>
                        handleInteractionAnswer(index)
                      }
                      className="w-full bg-black text-white py-3 rounded-xl"
                    >
                      {option}
                    </button>

                  )
                )}

              </div>

            </div>

          </div>

        )}

        {showFinalQuiz && (

          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">

            <div className="bg-white p-8 rounded-2xl w-full max-w-md">

              <h2 className="text-2xl font-bold mb-6 text-center">
                {lesson.finalQuizQuestions.questions[
  currentFinalQuestionIndex
].question}
              </h2>

              <div className="space-y-4">

                {lesson.finalQuizQuestions.questions[
  currentFinalQuestionIndex
].options.map(
                  (
                    option: string,
                    index: number
                  ) => (

                    <button
                      key={index}
                      onClick={() =>
                        handleFinalQuiz(index)
                      }
                      className="w-full bg-black text-white py-3 rounded-xl"
                    >
                      {option}
                    </button>

                  )
                )}

              </div>

            </div>

          </div>

        )}

        {moduleCompleted && (

          <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-xl">
            Module Completed
          </div>

        )}

      </div>

    </main>
  )
  }