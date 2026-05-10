import { useEffect, useState } from 'react'
import { getCoursesData } from '../data/api.js'
import PageHeader from '../components/ui/PageHeader'
import SectionCard from '../components/ui/SectionCard'
import EmptyState from '../components/ui/EmptyState'
import StatusBadge from '../components/ui/StatusBadge'

function Courses() {
  const [courses, setCourses] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    let active = true

    async function loadCourses() {
      const data = await getCoursesData(query)
      if (active) setCourses(data.courses)
    }

    loadCourses()
    return () => {
      active = false
    }
  }, [query])

  return (
    <div className="space-y-8">
      <PageHeader
        title="Courses"
        subtitle="Browse your current semester courses."
        actions={
          <input
            type="text"
            placeholder="Filter courses..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-500 md:w-64"
          />
        }
      />

      <SectionCard>
        {courses.length === 0 ? (
          <EmptyState
            title="No matching courses"
            description="Try another search term."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="pb-3 font-medium">Code</th>
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">CH</th>
                  <th className="pb-3 font-medium">Instructor</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.code} className="border-b border-slate-100 text-sm">
                    <td className="py-4 font-semibold text-violet-700">{course.code}</td>
                    <td className="py-4">{course.title}</td>
                    <td className="py-4">{course.ch}</td>
                    <td className="py-4">{course.instructor}</td>
                    <td className="py-4">{course.method}</td>
                    <td className="py-4">
                      <StatusBadge value={course.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </div>
  )
}

export default Courses