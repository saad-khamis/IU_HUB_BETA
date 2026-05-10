import { useEffect, useMemo, useState } from 'react'
import { getProfileData } from '../data/api.js'
import PageHeader from '../components/ui/PageHeader'
import SectionCard from '../components/ui/SectionCard'

function Profile() {
  const [student, setStudent] = useState(null)

  useEffect(() => {
    async function loadProfile() {
      const data = await getProfileData()
      setStudent(data.student)
    }

    loadProfile()
  }, [])

  const initials = useMemo(() => {
    if (!student?.name) return 'ST'
    return student.name
      .split(' ')
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase()
  }, [student])

  if (!student) return <p className="text-slate-500">Loading profile...</p>

  return (
    <div className="space-y-8">
      <PageHeader
        title="Profile"
        subtitle="Student personal and academic information."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <SectionCard title="Basic Information" className="xl:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              ['Full Name', student.fullName],
              ['Student ID', student.id],
              ['Gender', student.gender],
              ['Nationality', student.nationality],
              ['Email', student.email],
              ['Mobile', student.mobile],
              ['Birth Date', student.birthDate],
              ['National ID', student.nationalId],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                <p className="mt-1 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <div className="mb-6 flex justify-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-violet-100 text-3xl font-extrabold text-violet-700 dark:bg-violet-500/15">
              {initials}
            </div>
          </div>

          <div className="space-y-4">
            {[
              ['Faculty', student.faculty],
              ['Level', student.level],
              ['Degree', student.degree],
              ['Major', student.major],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                <p className="mt-1 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

export default Profile