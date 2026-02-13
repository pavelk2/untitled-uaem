import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store'
import {
  setCurrentForm,
  addQuestion,
  removeQuestion,
  updateQuestion,
  updateForm,
  type FormQuestion,
} from '@/store/slices/formsSlice'
import { Button } from '@/components/button/Button'
import { Card } from '@/components/card/Card'
import { QUESTION_TYPES } from '@/utils/constants'
import { QuestionCard } from './QuestionCard'
import { QuestionTypeSelector } from './QuestionTypeSelector'

export function FormBuilderPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const forms = useAppSelector((state) => state.forms.forms)
  const currentForm = useAppSelector((state) => state.forms.currentForm)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  const backPath = isAuthenticated ? '/dashboard' : '/'

  useEffect(() => {
    const form = forms.find((f) => f.id === id) ?? null
    dispatch(setCurrentForm(form))

    return () => {
      dispatch(setCurrentForm(null))
    }
  }, [id, forms, dispatch])

  if (!currentForm) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-neutral-500">Form not found</p>
        <Button variant="secondary" onClick={() => navigate(backPath)}>
          Go Back
        </Button>
      </div>
    )
  }

  const handleAddQuestion = (type: string) => {
    const newQuestion: FormQuestion = {
      id: `q-${Date.now()}`,
      type,
      title: '',
      required: false,
      order: currentForm.questions.length,
      options:
        type === QUESTION_TYPES.SINGLE_CHOICE ||
        type === QUESTION_TYPES.MULTIPLE_CHOICE
          ? ['Option 1', 'Option 2']
          : undefined,
    }
    dispatch(addQuestion(newQuestion))
  }

  const handleUpdateQuestion = (question: FormQuestion) => {
    dispatch(updateQuestion(question))
  }

  const handleRemoveQuestion = (questionId: string) => {
    dispatch(removeQuestion(questionId))
  }

  const handleTogglePublish = () => {
    dispatch(
      updateForm({
        ...currentForm,
        isPublished: !currentForm.isPublished,
        updatedAt: new Date().toISOString(),
      }),
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Top Bar */}
      <header className="glass-strong sticky top-0 z-10 border-b border-neutral-200/60">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(backPath)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
              aria-label="Go back"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 10H5M5 10l5-5M5 10l5 5" />
              </svg>
            </button>
            <div>
              <h1 className="text-base font-semibold text-neutral-900">
                {currentForm.title || 'Untitled Form'}
              </h1>
              <p className="text-xs text-neutral-400">
                {currentForm.questions.length} question
                {currentForm.questions.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/forms/${currentForm.id}/preview`)}
            >
              Preview
            </Button>
            <Button
              variant={currentForm.isPublished ? 'secondary' : 'primary'}
              size="sm"
              onClick={handleTogglePublish}
            >
              {currentForm.isPublished ? 'Unpublish' : 'Publish'}
            </Button>
          </div>
        </div>
      </header>

      {/* Builder Content */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Form Title Card */}
        <Card className="mb-6">
          <input
            type="text"
            value={currentForm.title}
            onChange={(e) =>
              dispatch(
                updateForm({
                  ...currentForm,
                  title: e.target.value,
                  updatedAt: new Date().toISOString(),
                }),
              )
            }
            placeholder="Form Title"
            className="w-full text-xl font-bold text-neutral-900 bg-transparent border-none outline-none placeholder:text-neutral-300"
          />
          <input
            type="text"
            value={currentForm.description}
            onChange={(e) =>
              dispatch(
                updateForm({
                  ...currentForm,
                  description: e.target.value,
                  updatedAt: new Date().toISOString(),
                }),
              )
            }
            placeholder="Add a description..."
            className="w-full text-sm text-neutral-500 bg-transparent border-none outline-none mt-2 placeholder:text-neutral-300"
          />
        </Card>

        {/* Questions */}
        <div className="flex flex-col gap-4 mb-8">
          {currentForm.questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onUpdate={handleUpdateQuestion}
              onRemove={() => handleRemoveQuestion(question.id)}
            />
          ))}
        </div>

        {/* Add Question */}
        <QuestionTypeSelector onSelect={handleAddQuestion} />
      </main>
    </div>
  )
}
