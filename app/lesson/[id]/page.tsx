"use client"

import { useEffect, useRef, useState } from "react"

import YouTube from "react-youtube"

import { lessons } from "@/data/lessons"

import { auth } from "@/lib/firebase"

import {
  collection,
setDoc,
  doc
} from "firebase/firestore"

import { db } from "@/lib/firebase"

export default function LessonPage() {

  const lesson = lessons[0]

  const playerRef = useRef<any>(null)

  const [currentInteraction, setCurrentInteraction] = useState<any>(null)

  const [completedInteractions, setCompletedInteractions] = useState<number[]>([])

  const [showFinalQuiz, setShowFinalQuiz] = useState(false)

  const [moduleCompleted, setModuleCompleted] = useState(false)
  
  const [score, setScore] = useState(0)

  const interactionTriggered = useRef<number[]>([])

  const onReady = (event: any) => {

    playerRef.current = event.target

  }

  useEffect(() => {

    const interval = setInterval(() => {

      if (!playerRef.current) return

      const currentTime = Math.floor(
        playerRef.current.getCurrentTime()
      )

      const interaction = lesson.interactions.find(
        (item) =>
          item.time === currentTime &&
          !interactionTriggered.current.includes(item.id)
      )

      if (interaction) {

        interactionTriggered.current.push(interaction.id)

        playerRef.current.pauseVideo()

        setCurrentInteraction(interaction)
      }

      const allCompleted =
  completedInteractions.length ===
  lesson.interactions.length

if (
  allCompleted &&
  !showFinalQuiz &&
  !moduleCompleted &&
  currentTime >= lesson.finalQuiz.time
) {
  setShowFinalQuiz(true)

  playerRef.current.pauseVideo()
}

    }, 1000)

    return () => clearInterval(interval)

  }, [completedInteractions, lesson, moduleCompleted, showFinalQuiz])

  const handleInteractionAnswer = (
  selectedIndex: number
) => {

  if (!currentInteraction) return

  if (
    selectedIndex ===
    currentInteraction.correctAnswer
  ) {

    setScore((prev) => prev + 10)
  }

  setCompletedInteractions((prev) => [
    ...prev,
    currentInteraction.id,
  ])

  setCurrentInteraction(null)

  playerRef.current.playVideo()
}

  const handleFinalQuiz = async (
  selectedIndex: number
) => {

  let finalScore = score

  if (
    selectedIndex ===
    lesson.finalQuiz.correctAnswer
  ) {

    finalScore += 20
  }

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

await setDoc(progressRef, {

  userId:
    currentUser.uid,

  userName:
    currentUser.displayName,

  userEmail:
    currentUser.email,

  moduleId:
    lesson.id,

  courseId:
    lesson.courseId,

  moduleTitle:
    lesson.title,

  score:
    finalScore,

  completed:
    true,

  completedAt:
    new Date(),
})


    console.log(
      "Progress Saved Successfully"
    )

  } catch (error) {

    console.error(
      "Firebase Save Error:",
      error
    )
  }

  setShowFinalQuiz(false)

  setModuleCompleted(true)

  alert(
    `Module Completed! Score: ${finalScore}`
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
                  (option: string, index: number) => (

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

                {lesson.finalQuiz.question}

              </h2>

              <div className="space-y-4">

                {lesson.finalQuiz.options.map(
                  (option: string, index: number) => (

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