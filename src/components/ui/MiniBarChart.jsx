function MiniBarChart({ title, data, valueKey, labelKey }) {
  const max = Math.max(...data.map((item) => item[valueKey]), 1)

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>

      <div className="mt-5 space-y-4">
        {data.map((item) => {
          const width = `${(item[valueKey] / max) * 100}%`

          return (
            <div key={item[labelKey]}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{item[labelKey]}</span>
                <span className="text-slate-500">{item[valueKey]}</span>
              </div>

              <div className="h-3 rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-violet-600 transition-all"
                  style={{ width }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MiniBarChart