"use client"

import Link from "next/link"
import { courses } from "@/data/courses"

export default function Dashboard() {

  const completedCourses = 2

  const completionPercentage = Math.round(
    (completedCourses / courses.length) * 100
  )

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">

          <h1 className="text-4xl font-bold">
            Student Dashboard
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Overall Progress
          </p>

          <div className="w-full h-5 bg-gray-200 rounded-full mt-4 overflow-hidden">

            <div
              className="bg-black h-full"
              style={{ width: `${completionPercentage}%` }}
            />

          </div>

          <p className="mt-3 font-semibold">
            {completionPercentage}% Completed
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {courses.map((course, index) => {

            const isLocked = index > completedCourses

            return (

              <div
                key={course.id}
                className={`rounded-2xl p-6 shadow-lg ${
                  isLocked
                    ? "bg-gray-300 opacity-70"
                    : "bg-white"
                }`}
              >

                <h2 className="text-2xl font-bold mb-4">
                  {course.title}
                </h2>


                {isLocked ? (

                  <button
                    disabled
                    className="bg-gray-500 text-white px-4 py-2 rounded-xl"
                  >
                    Locked
                  </button>

                ) : (

                  <Link
                    href={`/course/${course.id}`}
                    className="inline-block bg-black text-white px-4 py-2 rounded-xl"
                  >
                    Open Course
                  </Link>

                )}

              </div>

            )
          })}

        </div>

      </div>

    </main>
  )
}