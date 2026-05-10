import { student, courses } from "../data/student"

function StatCard({ title, value, color = "text-violet-700" }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <p className="text-gray-500">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-violet-700 mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <StatCard title="CGPA" value={student.cgpa} />
        <StatCard title="Hours" value={student.hours} />
        <StatCard title="Status" value={student.status} color="text-sky-600" />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold mb-4">Courses</h2>

        {courses.map((course) => (
          <div key={course.code} className="mb-2">
            {course.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard