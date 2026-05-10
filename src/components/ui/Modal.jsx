function Modal({ open, title, children, footer, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        className="absolute inset-0 bg-slate-950/50"
        onClick={onClose}
        aria-label="Close modal overlay"
      />

      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        <div>{children}</div>

        {footer ? (
          <div className="mt-6 flex justify-end gap-3">{footer}</div>
        ) : null}
      </div>
    </div>
  )
}

export default Modal