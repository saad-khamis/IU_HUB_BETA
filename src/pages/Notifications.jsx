import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import SectionCard from '../components/ui/SectionCard'

function Notifications() {
  const [notifications] = useState([
    { id: 1, text: 'New course available' },
    { id: 2, text: 'Payment pending' },
  ])

  return (
    <div className="space-y-8">
      <PageHeader title="Notifications" />

      <SectionCard>
        {notifications.map((n) => (
          <div key={n.id} className="p-4 border-b">
            {n.text}
          </div>
        ))}
      </SectionCard>
    </div>
  )
}

export default Notifications