import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store'
import { setForms, type Form } from '@/store/slices/formsSlice'
import { Card } from '@/components/card/Card'
import { Button } from '@/components/button/Button'
import { DUMMY_FORMS } from '@/utils/dummy-data'
import { formatRelativeTime } from '@/utils/date'
import { FORM_TYPES } from '@/utils/constants'
import { CreateFormModal } from './CreateFormModal'

const formTypeLabels: Record<string, string> = {
  [FORM_TYPES.REGISTRATION]: 'Registration',
  [FORM_TYPES.SALES]: 'Sales',
  [FORM_TYPES.CALL_BOOKING]: 'Call Booking',
  [FORM_TYPES.SURVEY]: 'Survey',
  [FORM_TYPES.FEEDBACK]: 'Feedback',
}

const formTypeColors: Record<string, string> = {
  [FORM_TYPES.REGISTRATION]: 'bg-primary-100 text-primary-700',
  [FORM_TYPES.SALES]: 'bg-accent-100 text-accent-700',
  [FORM_TYPES.CALL_BOOKING]: 'bg-success-100 text-success-700',
  [FORM_TYPES.SURVEY]: 'bg-info-100 text-info-700',
  [FORM_TYPES.FEEDBACK]: 'bg-warning-100 text-warning-700',
}

export function DashboardPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const forms = useAppSelector((state) => state.forms.forms)
  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    if (forms.length === 0) {
      dispatch(setForms(DUMMY_FORMS))
    }
  }, [dispatch, forms.length])

  const totalResponses = forms.reduce((sum, f) => sum + f.responses, 0)
  const avgCompletionRate =
    forms.length > 0
      ? Math.round(
          forms.reduce((sum, f) => sum + f.completionRate, 0) / forms.length,
        )
      : 0
  const publishedForms = forms.filter((f) => f.isPublished).length

  const handleFormClick = (form: Form) => {
    navigate(`/forms/${form.id}/edit`)
  }

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Welcome back{user?.name ? `, ${user.name}` : ''}
          </h1>
          <p className="text-neutral-500 mt-1">
            Here&apos;s an overview of your forms and funnels
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} size="lg">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M8 3v10M3 8h10" />
          </svg>
          New Form
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card variant="glass">
          <div className="text-sm font-medium text-neutral-500 mb-1">
            Total Forms
          </div>
          <div className="text-3xl font-bold text-neutral-900">
            {forms.length}
          </div>
        </Card>
        <Card variant="glass">
          <div className="text-sm font-medium text-neutral-500 mb-1">
            Published
          </div>
          <div className="text-3xl font-bold text-neutral-900">
            {publishedForms}
          </div>
        </Card>
        <Card variant="glass">
          <div className="text-sm font-medium text-neutral-500 mb-1">
            Total Responses
          </div>
          <div className="text-3xl font-bold text-neutral-900">
            {totalResponses}
          </div>
        </Card>
        <Card variant="glass">
          <div className="text-sm font-medium text-neutral-500 mb-1">
            Avg. Completion
          </div>
          <div className="text-3xl font-bold text-neutral-900">
            {avgCompletionRate}%
          </div>
        </Card>
      </div>

      {/* Forms List */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Your Forms
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => (
          <Card
            key={form.id}
            hover
            onClick={() => handleFormClick(form)}
            className="flex flex-col"
          >
            <div className="flex items-start justify-between mb-3">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${formTypeColors[form.type] ?? 'bg-neutral-100 text-neutral-600'}`}
              >
                {formTypeLabels[form.type] ?? form.type}
              </span>
              <span
                className={`w-2 h-2 rounded-full mt-1 ${form.isPublished ? 'bg-success-500' : 'bg-neutral-300'}`}
                title={form.isPublished ? 'Published' : 'Draft'}
              />
            </div>

            <h3 className="text-base font-semibold text-neutral-900 mb-1">
              {form.title}
            </h3>
            <p className="text-sm text-neutral-500 mb-4 line-clamp-2 flex-1">
              {form.description}
            </p>

            <div className="flex items-center justify-between text-xs text-neutral-400 pt-4 border-t border-neutral-100">
              <span>{form.responses} responses</span>
              <span>{formatRelativeTime(form.updatedAt)}</span>
            </div>
          </Card>
        ))}

        {/* Create New Form Card */}
        <Card
          hover
          onClick={() => setShowCreateModal(true)}
          className="flex flex-col items-center justify-center min-h-[200px] border-dashed border-2 border-neutral-200 bg-transparent shadow-none"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mb-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-primary-500"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <span className="text-sm font-medium text-neutral-500">
            Create New Form
          </span>
        </Card>
      </div>

      <CreateFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  )
}
