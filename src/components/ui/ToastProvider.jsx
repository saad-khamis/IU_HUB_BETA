import { createContext, useCallback, useMemo, useState } from 'react'

export const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((message, type = 'success') => {
    const id = `${Date.now()}-${Math.random()}`
    const toast = { id, message, type }

    setToasts((prev) => [...prev, toast])

    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }, [removeToast])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed right-4 top-4 z-50 space-y-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto min-w-64 max-w-sm rounded-2xl px-4 py-3 text-sm font-medium shadow-lg ${
              toast.type === 'error'
                ? 'bg-red-600 text-white'
                : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}