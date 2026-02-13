import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store'
import { LandingPage } from '@/modules/landing/LandingPage'
import { LoginPage } from '@/modules/auth/LoginPage'
import { SignupPage } from '@/modules/auth/SignupPage'
import { DashboardLayout } from '@/modules/dashboard/DashboardLayout'
import { DashboardPage } from '@/modules/dashboard/DashboardPage'
import { FormBuilderPage } from '@/modules/form-builder/FormBuilderPage'
import { FormPreviewPage } from '@/modules/form-builder/FormPreviewPage'
import { SettingsPage } from '@/modules/settings/SettingsPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  return <>{children}</>
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />

        {/* Auth routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />

        {/* Protected routes with sidebar layout */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Form builder & preview - accessible without login */}
        <Route path="/forms/:id/edit" element={<FormBuilderPage />} />
        <Route path="/forms/:id/preview" element={<FormPreviewPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
