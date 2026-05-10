function StatCard({ title, value, color = 'text-violet-700' }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <h3 className={`mt-3 text-3xl font-extrabold ${color}`}>{value}</h3>
    </div>
  )
}

export default StatCard