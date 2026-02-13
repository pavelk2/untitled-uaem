import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store'
import { toggleSidebar } from '@/store/slices/globalSlice'
import { logout } from '@/store/slices/authSlice'
import { APP_NAME } from '@/utils/constants'

function NavItem({
  to,
  icon,
  label,
}: {
  to: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
          isActive
            ? 'bg-primary-50 text-primary-700'
            : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}

export function DashboardLayout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const sidebarOpen = useAppSelector((state) => state.global.sidebarOpen)
  const user = useAppSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Sidebar */}
      <aside
        className={`
          ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}
          flex-shrink-0 transition-all duration-200
          border-r border-neutral-200/60 bg-surface-raised
          flex flex-col
        `}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 32 32"
                fill="none"
                className="text-white"
              >
                <path
                  d="M4 8a4 4 0 014-4h16a4 4 0 014 4v16a4 4 0 01-4 4H8a4 4 0 01-4-4V8z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d="M10 14h12M10 18h8"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-base font-bold text-neutral-900">
              {APP_NAME}
            </span>
          </div>

          <nav className="flex flex-col gap-1">
            <NavItem
              to="/dashboard"
              label="Dashboard"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="5.5" height="5.5" rx="1" />
                  <rect x="10.5" y="2" width="5.5" height="5.5" rx="1" />
                  <rect x="2" y="10.5" width="5.5" height="5.5" rx="1" />
                  <rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1" />
                </svg>
              }
            />
            <NavItem
              to="/settings"
              label="Settings"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="9" r="3" />
                  <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.1 3.1l1.4 1.4M13.5 13.5l1.4 1.4M3.1 14.9l1.4-1.4M13.5 4.5l1.4-1.4" />
                </svg>
              }
            />
          </nav>
        </div>

        {/* User section at bottom */}
        <div className="mt-auto p-6 border-t border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-xs font-semibold text-primary-700">
              {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-800 truncate">
                {user?.name ?? 'User'}
              </p>
              <p className="text-xs text-neutral-400 truncate">
                {user?.email ?? ''}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
              aria-label="Sign out"
              title="Sign out"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 p-4 border-b border-neutral-200/60 bg-surface-raised">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100"
            aria-label="Toggle sidebar"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M3 5h12M3 9h12M3 13h12" />
            </svg>
          </button>
          <span className="text-sm font-bold text-neutral-900">
            {APP_NAME}
          </span>
        </div>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
