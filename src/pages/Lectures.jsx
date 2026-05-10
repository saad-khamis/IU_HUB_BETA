import { useEffect, useState } from 'react'
import { getLectures } from '../data/api'
import PageHeader from '../components/ui/PageHeader'
import SectionCard from '../components/ui/SectionCard'

function Lectures() {
  const [data, setData] = useState([])

  useEffect(() => {
    getLectures().then(setData)
  }, [])

  return (
    <div className="space-y-8">
      <PageHeader title="Lectures & Sections" />

      {data.map((course) => (
        <SectionCard key={course.id} title={course.title}>
          <h4 className="font-bold mb-2">Lectures</h4>
          {course.lectures.map((l) => (
            <div key={l.id}>{l.title}</div>
          ))}

          <h4 className="font-bold mt-4 mb-2">Sections</h4>
          {course.sections.map((s) => (
            <div key={s.id}>
              {s.instructor} — {s.time}
            </div>
          ))}
        </SectionCard>
      ))}
    </div>
  )
}

export default Lectures
