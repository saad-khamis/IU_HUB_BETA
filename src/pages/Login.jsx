import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { login, isAuthenticated } from '../auth/auth'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [form, setForm] = useState({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  const validation = useMemo(() => {
    if (!form.username.trim() || !form.password.trim()) {
      return 'Username and password are required.'
    }

    if (form.username.trim().length < 3) {
      return 'Username must be at least 3 characters.'
    }

    if (form.password.trim().length < 4) {
      return 'Password must be at least 4 characters.'
    }

    return ''
  }, [form])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (validation) {
      setError(validation)
      return
    }

    setLoading(true)

    try {
      await login(form.username, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-violet-700">IU HUB</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Sign in to access your student portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-violet-700 px-4 py-3 font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <p className="font-semibold text-slate-700 dark:text-slate-100">
            Demo credentials
          </p>
          <p className="mt-1">Username: saad</p>
          <p>Password: 1234</p>
        </div>
      </div>
    </div>
  )
}

export default Login