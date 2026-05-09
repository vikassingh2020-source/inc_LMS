"use client"

import {
  useEffect,
  useState,
} from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth"

import { db, auth } from "@/lib/firebase"

import { courses } from "@/data/courses"

export default function Dashboard() {

    const router = useRouter()
    
  const [completedModules, setCompletedModules] =
    useState<any[]>([])

  const [averageScore, setAverageScore] =
    useState(0)

  const [userName, setUserName] =
    useState("")

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {

          if (!user) {

            setLoading(false)

            return
          }

          try {

            setUserName(
              user.displayName || "Student"
            )

            const q = query(
              collection(
                db,
                "studentProgress"
              ),

              where(
                "userId",
                "==",
                user.uid
              )
            )

            const querySnapshot =
              await getDocs(q)

            const progressData: any[] = []

            querySnapshot.forEach((doc) => {

              progressData.push(doc.data())

            })

            setCompletedModules(progressData)

            if (
              progressData.length > 0
            ) {

              const totalScore =
                progressData.reduce(
                  (sum, item) =>
                    sum + item.score,
                  0
                )

              const avg =
                totalScore /
                progressData.length

              setAverageScore(
                Math.round(avg)
              )
            }

          } catch (error) {

            console.error(
              "Dashboard Error:",
              error
            )

          } finally {

            setLoading(false)
          }
        }
      )

    return () => unsubscribe()

  }, [])

  const completedCount =
    completedModules.length

  const progressPercentage =
    Math.round(
      (completedCount / 40) * 100
    )

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center">

        <h1 className="text-2xl font-bold">
          Loading Dashboard...
        </h1>

      </main>
    )
  }

  return (

    <main className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>

              <h1 className="text-4xl font-bold">

                Welcome, {userName}

              </h1>

              <p className="text-gray-600 mt-2">

                Continue building your future skills.

              </p>

            </div>

            <button
              onClick={async () => {

  await signOut(auth)

  router.push("/")
}}
              className="bg-red-500 text-white px-4 py-2 rounded-xl"
            >
              Logout
            </button>

          </div>

          <div className="mt-8">

            <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">

              <div
                className="bg-black h-full"
                style={{
                  width: `${progressPercentage}%`,
                }}
              />

            </div>

            <p className="mt-3 font-semibold">

              {progressPercentage}% Completed

            </p>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

            <div className="bg-gray-100 p-4 rounded-xl">

              <p className="text-gray-500 text-sm">
                Modules Completed
              </p>

              <h2 className="text-2xl font-bold">

                {completedCount}

              </h2>

            </div>

            <div className="bg-gray-100 p-4 rounded-xl">

              <p className="text-gray-500 text-sm">
                Average Score
              </p>

              <h2 className="text-2xl font-bold">

                {averageScore}
              </h2>

            </div>

          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {courses.map((course, index) => {

            const modulesPerCourse = 3

const requiredModules =
  index * modulesPerCourse

const unlocked =
  completedCount >= requiredModules
            return (

              <div
                key={course.id}
                className={`rounded-2xl p-6 shadow-lg ${
                  unlocked
                    ? "bg-white"
                    : "bg-gray-300 opacity-70"
                }`}
              >

                <h2 className="text-2xl font-bold mb-4">

                  {course.title}

                </h2>

                {unlocked ? (

                  <Link
                    href={`/course/${course.id}`}
                    className="inline-block bg-black text-white px-4 py-2 rounded-xl"
                  >
                    Open Course
                  </Link>

                ) : (

                  <button
                    disabled
                    className="bg-gray-500 text-white px-4 py-2 rounded-xl"
                  >
                    Locked
                  </button>

                )}

              </div>

            )
          })}

        </div>

      </div>

    </main>
  )
}