import { useEffect, useState } from 'react'
import { getDashboardData } from '../data/api.js'
import PageHeader from '../components/ui/PageHeader'
import SectionCard from '../components/ui/SectionCard'
import StatCard from '../components/ui/StatCard'
import StatusBadge from '../components/ui/StatusBadge'
import MiniBarChart from '../components/ui/MiniBarChart'
import TrendChart from '../components/ui/TrendChart'

function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [student, setStudent] = useState(null)
  const [courses, setCourses] = useState([])
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    let active = true

    async function loadData() {
      try {
        const data = await getDashboardData()
        if (!active) return
        setStudent(data.student)
        setCourses(data.courses)
        setAnalytics(data.analytics)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadData()
    return () => {
      active = false
    }
  }, [])

  if (loading || !student || !analytics) {
    return <p className="text-slate-500">Loading dashboard...</p>
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Quick overview of your academic performance and registration."
      />

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="CGPA" value={student.cgpa} />
        <StatCard title="Registered Hours" value={student.hours} />
        <StatCard title="Academic Status" value={student.status} color="text-sky-600" />
        <StatCard title="Passed CH" value={student.passedCH} />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <TrendChart
          title="CGPA Progress"
          data={analytics.performanceTrend}
        />

        <MiniBarChart
          title="Grade Distribution"
          data={analytics.gradeDistribution}
          valueKey="value"
          labelKey="label"
        />

        <SectionCard title="Academic Insights">
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Attendance</p>
              <p className="mt-1 text-2xl font-bold text-emerald-600">
                {analytics.attendance}%
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Completed Courses</p>
              <p className="mt-1 text-2xl font-bold text-violet-700">
                {analytics.completedCourses}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Pending Fees</p>
              <p className="mt-1 text-2xl font-bold text-red-600">
                {analytics.pendingFees} EGP
              </p>
            </div>
          </div>
        </SectionCard>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <SectionCard
          title="Registered Courses"
          className="xl:col-span-2"
          actions={
            <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
              {courses.length} Courses
            </span>
          }
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="pb-3 font-medium">Code</th>
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Section</th>
                  <th className="pb-3 font-medium">Method</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.code} className="border-b border-slate-100 text-sm">
                    <td className="py-4 font-semibold text-violet-700">{course.code}</td>
                    <td className="py-4">{course.title}</td>
                    <td className="py-4">{course.section}</td>
                    <td className="py-4">{course.method}</td>
                    <td className="py-4">
                      <StatusBadge value={course.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Student Summary">
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Faculty</p>
              <p className="mt-1 font-semibold">{student.faculty}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Major</p>
              <p className="mt-1 font-semibold">{student.major}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Enrollment</p>
              <p className="mt-1 font-semibold text-emerald-700">Enrolled</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Level</p>
              <p className="mt-1 font-semibold">{student.level}</p>
            </div>
          </div>
        </SectionCard>
      </section>
    </div>
  )
}

export default Dashboard