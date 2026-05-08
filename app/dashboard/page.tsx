export default function Dashboard() {
  const courses = [
    {
      id: 1,
      title: "Communication Skills",
      progress: 40,
    },
    {
      id: 2,
      title: "Leadership",
      progress: 70,
    },
  ]

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">
        Student Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-semibold">
              {course.title}
            </h2>

            <div className="w-full bg-gray-200 h-4 rounded-full mt-4">
              <div
                className="bg-black h-4 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>

            <p className="mt-2">
              {course.progress}% completed
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}