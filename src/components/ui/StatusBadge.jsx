 const statusClasses = {
  Approved:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  Available:
    'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  Pending:
    'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  Paid:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  Unpaid:
    'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
  Active:
    'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
}

function StatusBadge({ value }) {
  const classes =
    statusClasses[value] ||
    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classes}`}
    >
      {value}
    </span>
  )
}

export default StatusBadge