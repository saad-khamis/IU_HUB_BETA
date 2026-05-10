import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Bell, LogOut, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getUser, logout } from '../auth/auth'
import { appRoutes } from '../config/routes.jsx'
import { searchAppData } from '../data/api.js'

const THEME_KEY = 'iu_hub_theme'

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY)
  if (saved) return saved

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function Layout() {
  const navigate = useNavigate()
  const user = getUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)
  const searchRef = useRef(null)

  const navItems = useMemo(() => appRoutes.filter((route) => route.showInNav), [])

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    let active = true

    async function runSearch() {
      if (!search.trim()) {
        setResults([])
        return
      }

      setSearching(true)

      try {
        const data = await searchAppData(search)
        if (active) setResults(data)
      } finally {
        if (active) setSearching(false)
      }
    }

    const timer = setTimeout(runSearch, 250)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [search])

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([])
      }
    }

    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const handleNavigateFromSearch = (item) => {
  if (item.type === 'course') {
    navigate('/courses', { state: { highlight: item.label } })
  } else {
    navigate(item.path)
  }

  setSearch('')
  setResults([])
}

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">
        {sidebarOpen && (
          <button
            className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed left-0 top-0 z-40 flex h-full w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 shadow-sm transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-violet-700">
                IU_HUB
              </h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Innovation University Portal
              </p>
            </div>

            <button
              className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.fullPath}
                  to={item.fullPath}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-violet-100 text-violet-700 shadow-sm dark:bg-violet-500/15'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-violet-700 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              )
            })}
          </nav>

          <div className="mt-auto rounded-3xl bg-violet-700 p-5 text-white shadow-lg">
            <p className="text-sm text-violet-100">Current Semester</p>
            <h3 className="mt-2 text-xl font-bold">Spring 2026</h3>
            <p className="mt-2 text-sm text-violet-100">
              Faculty of Computers and Information Technology
            </p>
            <div className="mt-4 rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-violet-100">
                Student Level
              </p>
              <p className="mt-1 text-lg font-semibold">
                Level {user?.level ?? '--'}
              </p>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 md:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu size={18} />
                </button>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back</p>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    {user?.name || 'Student'}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div ref={searchRef} className="relative hidden md:block">
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800">
                    <Search size={16} className="text-slate-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search pages or courses..."
                      className="w-44 bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                  </div>

                  {(results.length > 0 || searching) && (
                    <div className="absolute right-0 top-14 w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                      {searching ? (
                        <p className="px-3 py-2 text-sm text-slate-500">Searching...</p>
                      ) : (
                        results.map((item, index) => (
                          <button
                            key={`${item.path}-${index}`}
                            onClick={() => handleNavigateFromSearch(item.path)}
                            className="block w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                          >
                            {item.label}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
                  className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>

                <button className="relative rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                  <Bell size={18} />
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-sky-500"></span>
                </button>

                <div className="hidden rounded-2xl bg-violet-700 px-4 py-2 text-sm font-semibold text-white sm:block">
                  Level {user?.level ?? '--'}
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout