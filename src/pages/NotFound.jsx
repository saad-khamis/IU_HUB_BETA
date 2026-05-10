import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
          404 Error
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
          Page not found
        </h1>
        <p className="mt-4 text-slate-500">
          The page you’re looking for does not exist or may have been moved.
        </p>

        <Link
          to="/dashboard"
          className="mt-6 inline-flex rounded-2xl bg-violet-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-800"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFound