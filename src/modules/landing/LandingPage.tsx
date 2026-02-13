import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store'
import { addForm } from '@/store/slices/formsSlice'
import { Button } from '@/components/button/Button'
import { APP_NAME, FORM_TYPES } from '@/utils/constants'

export function LandingPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleCreateForm = () => {
    const newForm = {
      id: `form-${Date.now()}`,
      title: 'Untitled Form',
      description: '',
      type: FORM_TYPES.REGISTRATION,
      questions: [],
      responses: 0,
      completionRate: 0,
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    dispatch(addForm(newForm))
    navigate(`/forms/${newForm.id}/edit`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-surface to-accent-50 flex flex-col">
      {/* Nav */}
      <header className="glass-strong border-b border-neutral-200/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button size="sm" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100/80 text-primary-700 text-xs font-medium mb-8">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M7 1v4l2.5 1.5" />
              <circle cx="7" cy="7" r="6" />
            </svg>
            AI-powered form builder
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight tracking-tight mb-6">
            Build forms that{' '}
            <span className="text-primary-600">convert</span>,{' '}
            <br className="hidden sm:block" />
            in seconds
          </h1>

          <p className="text-lg text-neutral-500 leading-relaxed mb-10 max-w-xl mx-auto">
            Create beautiful, AI-driven forms and funnels for registrations,
            sales, call bookings, and insights collection. No account required
            to get started.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={handleCreateForm}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M9 3v12M3 9h12" />
              </svg>
              Create Your First Form
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/login')}
            >
              Sign in to Dashboard
            </Button>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-16">
            {[
              'Registration Funnels',
              'Sales Pages',
              'Call Booking',
              'Surveys',
              'AI-Assisted',
            ].map((feature) => (
              <span
                key={feature}
                className="px-4 py-2 rounded-full glass text-sm text-neutral-600 font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 text-center text-xs text-neutral-400">
        {APP_NAME} &mdash; Beautiful forms, better conversions.
      </footer>
    </div>
  )
}
