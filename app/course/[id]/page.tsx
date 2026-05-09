import Link from "next/link"
import { courses } from "@/data/courses"

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  const course = courses.find(
    (c) => c.id === Number(id)
  )

  if (!course) {
    return <div>Course not found</div>
  }

  

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto">

        <Link
          href="/dashboard"
          className="inline-block mb-6 text-blue-600"
        >
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-lg">

          <h1 className="text-4xl font-bold mb-8">
            {course.title}
          </h1>

          <div className="space-y-4">

            {course.modules.map((module, index) => {

              const isLocked = false

              return (

                <div
                  key={index}
                  className={`p-5 rounded-2xl flex items-center justify-between ${
                    isLocked
                      ? "bg-gray-300 opacity-70"
                      : "bg-gray-100"
                  }`}
                >

                  <div>
                    <h2 className="text-xl font-bold">
                      Module {index + 1}
                    </h2>

                    <p className="text-gray-600">
                      {module.title}
                    </p>
                  </div>

                  {isLocked ? (

                    <button
                      disabled
                      className="bg-gray-500 text-white px-4 py-2 rounded-xl"
                    >
                      Locked
                    </button>

                  ) : (

                    <Link
                      href={`/lesson/${module.id}`}
                      className="bg-black text-white px-4 py-2 rounded-xl"
                    >
                      Start Module
                    </Link>

                  )}

                </div>

              )
            })}

          </div>

        </div>

      </div>

    </main>
  )
}