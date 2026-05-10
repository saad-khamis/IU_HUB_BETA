import { useEffect, useState } from 'react'
import {
  addCourse,
  dropCourse,
  getRegistrationData,
} from '../data/api.js'
import PageHeader from '../components/ui/PageHeader'
import SectionCard from '../components/ui/SectionCard'
import StatCard from '../components/ui/StatCard'
import StatusBadge from '../components/ui/StatusBadge'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../components/ui/useToast.jsx'

function Registration() {
  const { showToast } = useToast()
  const [summary, setSummary] = useState(null)
  const [registeredCourses, setRegisteredCourses] = useState([])
  const [availableCourses, setAvailableCourses] = useState([])
  const [query, setQuery] = useState('')
  const [loadingAction, setLoadingAction] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [selectedCourseCode, setSelectedCourseCode] = useState('')

  async function loadData(search = '') {
    const data = await getRegistrationData(search)
    setSummary(data.summary)
    setRegisteredCourses(data.registeredCourses)
    setAvailableCourses(data.availableCourses)
  }

  useEffect(() => {
    loadData(query)
  }, [query])

  const handleAddCourse = async () => {
    if (!selectedCourseCode) return

    setLoadingAction(true)

    try {
      await addCourse(selectedCourseCode)
      await loadData(query)
      setAddModalOpen(false)
      setSelectedCourseCode('')
      showToast('Course added successfully.')
    } catch (error) {
      showToast(error.message, 'error')
    } finally {
      setLoadingAction(false)
    }
  }

  const handleDropCourse = async (courseCode) => {
    setLoadingAction(true)

    try {
      await dropCourse(courseCode)
      await loadData(query)
      showToast('Course dropped successfully.')
    } catch (error) {
      showToast(error.message, 'error')
    } finally {
      setLoadingAction(false)
    }
  }

  if (!summary) return <p className="text-slate-500">Loading registration...</p>

  return (
    <div className="space-y-8">
      <PageHeader
        title="Registration"
        subtitle="Manage your registered courses and sections."
        actions={
          <input
            type="text"
            placeholder="Search registration..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-500 md:w-64"
          />
        }
      />

      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard title="Academic Load" value={`${summary.academicLoad} CH`} />
        <StatCard title="Approved Hours" value={`${summary.approvedHours} CH`} />
        <StatCard
          title="Registration Status"
          value={summary.registrationStatus}
          color="text-emerald-600"
        />
      </section>

      <SectionCard
        title="Registered Courses"
        actions={
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setAddModalOpen(true)}
              className="rounded-2xl bg-violet-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-800"
            >
              Add Course
            </button>
          </div>
        }
      >
        {registeredCourses.length === 0 ? (
          <EmptyState
            title="No registered courses"
            description="Add a course to start building your semester plan."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="pb-3 font-medium">Code</th>
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Section</th>
                  <th className="pb-3 font-medium">CH</th>
                  <th className="pb-3 font-medium">Payment</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {registeredCourses.map((course) => (
                  <tr key={course.code} className="border-b border-slate-100 text-sm">
                    <td className="py-4 font-semibold text-violet-700">{course.code}</td>
                    <td className="py-4">{course.title}</td>
                    <td className="py-4">{course.section}</td>
                    <td className="py-4">{course.ch}</td>
                    <td className="py-4">
                      <StatusBadge value={course.payment} />
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => handleDropCourse(course.code)}
                        disabled={loadingAction}
                        className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        Drop
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      <Modal
        open={addModalOpen}
        title="Add Course"
        onClose={() => {
          setAddModalOpen(false)
          setSelectedCourseCode('')
        }}
        footer={
          <>
            <button
              onClick={() => setAddModalOpen(false)}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCourse}
              disabled={!selectedCourseCode || loadingAction}
              className="rounded-2xl bg-violet-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:opacity-50"
            >
              {loadingAction ? 'Adding...' : 'Confirm Add'}
            </button>
          </>
        }
      >
        {availableCourses.length === 0 ? (
          <EmptyState
            title="No available courses"
            description="You have already registered all available courses."
          />
        ) : (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Select course
            </label>
            <select
              value={selectedCourseCode}
              onChange={(event) => setSelectedCourseCode(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500"
            >
              <option value="">Choose a course</option>
              {availableCourses.map((course) => (
                <option key={course.code} value={course.code}>
                  {course.code} — {course.title} ({course.ch} CH)
                </option>
              ))}
            </select>

            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Maximum allowed hours: {summary.maxHours} CH
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Registration