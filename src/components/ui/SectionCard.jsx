 function SectionCard({ title, actions, children, className = '' }) {
  return (
    <section
      className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {(title || actions) && (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {title ? (
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {title}
            </h3>
          ) : (
            <div />
          )}

          {actions ? <div>{actions}</div> : null}
        </div>
      )}

      {children}
    </section>
  )
}

export default SectionCard