function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {actions ? <div className="w-full md:w-auto">{actions}</div> : null}
    </div>
  )
}

export default PageHeader