import SectionCard from './SectionCard'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts'

function TrendChart({ title, data }) {
  return (
    <SectionCard title={title}>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="semester" stroke="#94a3b8" fontSize={12} />
            <YAxis domain={[2.5, 4]} stroke="#94a3b8" fontSize={12} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="cgpa"
              stroke="#7c3aed"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  )
}

export default TrendChart