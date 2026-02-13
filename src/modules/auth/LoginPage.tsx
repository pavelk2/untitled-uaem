import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch } from '@/store'
import { setUser } from '@/store/slices/authSlice'
import { Button } from '@/components/button/Button'
import { Input } from '@/components/input/Input'
import { APP_NAME } from '@/utils/constants'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Demo: simulate login with dummy user
    setTimeout(() => {
      dispatch(
        setUser({
          id: 'demo-user-1',
          email,
          name: 'Demo User',
        }),
      )
      setIsLoading(false)
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left - Branding */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-16">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 mx-auto">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="text-white"
            >
              <path
                d="M4 8a4 4 0 014-4h16a4 4 0 014 4v16a4 4 0 01-4 4H8a4 4 0 01-4-4V8z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M10 14h12M10 18h8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            {APP_NAME}
          </h1>
          <p className="text-primary-100 text-lg leading-relaxed">
            Create beautiful, AI-powered forms and funnels that convert.
            Designed for founders and marketing experts.
          </p>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex flex-col justify-center items-center p-8 lg:p-16">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-2xl font-bold text-neutral-900">{APP_NAME}</h1>
          </div>

          <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
            Welcome back
          </h2>
          <p className="text-neutral-500 mb-8">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-2"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-neutral-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="text-primary-600 font-medium hover:text-primary-700"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
