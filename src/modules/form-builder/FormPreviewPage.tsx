import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store'
import { setCurrentForm } from '@/store/slices/formsSlice'
import { Button } from '@/components/button/Button'
import { QUESTION_TYPES } from '@/utils/constants'

export function FormPreviewPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const forms = useAppSelector((state) => state.forms.forms)
  const currentForm = useAppSelector((state) => state.forms.currentForm)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const form = forms.find((f) => f.id === id) ?? null
    dispatch(setCurrentForm(form))
    return () => {
      dispatch(setCurrentForm(null))
    }
  }, [id, forms, dispatch])

  if (!currentForm || currentForm.questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-surface">
        <p className="text-neutral-500">
          {currentForm ? 'No questions yet. Add some questions first.' : 'Form not found'}
        </p>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    )
  }

  const question = currentForm.questions[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === currentForm.questions.length - 1
  const isWelcome = question.type === QUESTION_TYPES.WELCOME_SCREEN
  const isThankYou = question.type === QUESTION_TYPES.THANK_YOU_SCREEN

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-surface to-accent-50 flex flex-col">
      {/* Top bar */}
      <header className="p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(`/forms/${id}/edit`)}
          className="text-sm text-neutral-500 hover:text-neutral-700 font-medium transition-colors"
        >
          Close Preview
        </button>
        <div className="text-xs text-neutral-400">
          {currentStep + 1} / {currentForm.questions.length}
        </div>
      </header>

      {/* Progress bar */}
      <div className="px-4">
        <div className="h-1 rounded-full bg-neutral-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary-500 transition-all duration-500"
            style={{
              width: `${((currentStep + 1) / currentForm.questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg text-center">
          {(isWelcome || isThankYou) ? (
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-3xl font-bold text-neutral-900">
                {question.title}
              </h1>
              {question.description && (
                <p className="text-lg text-neutral-500">
                  {question.description}
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-start text-left gap-6">
              <h2 className="text-2xl font-semibold text-neutral-900">
                {question.title || 'Untitled Question'}
                {question.required && (
                  <span className="text-accent-500 ml-1">*</span>
                )}
              </h2>

              {/* Input preview */}
              {(question.type === QUESTION_TYPES.SHORT_TEXT ||
                question.type === QUESTION_TYPES.EMAIL ||
                question.type === QUESTION_TYPES.PHONE) && (
                <input
                  type="text"
                  placeholder="Type your answer here..."
                  className="w-full text-lg bg-transparent border-b-2 border-neutral-200 pb-2 outline-none focus:border-primary-500 transition-colors text-neutral-800 placeholder:text-neutral-300"
                  readOnly
                />
              )}

              {question.type === QUESTION_TYPES.LONG_TEXT && (
                <textarea
                  placeholder="Type your answer here..."
                  rows={3}
                  className="w-full text-lg bg-transparent border-b-2 border-neutral-200 pb-2 outline-none focus:border-primary-500 transition-colors text-neutral-800 placeholder:text-neutral-300 resize-none"
                  readOnly
                />
              )}

              {(question.type === QUESTION_TYPES.SINGLE_CHOICE ||
                question.type === QUESTION_TYPES.MULTIPLE_CHOICE) &&
                question.options && (
                  <div className="w-full flex flex-col gap-3">
                    {question.options.map((option, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-neutral-200 hover:border-primary-400 hover:bg-primary-50/50 cursor-pointer transition-all"
                      >
                        <span className="w-6 h-6 rounded-full border-2 border-neutral-300 flex items-center justify-center text-xs font-medium text-neutral-400">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-neutral-700">{option}</span>
                      </div>
                    ))}
                  </div>
                )}

              {question.type === QUESTION_TYPES.RATING && (
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="w-12 h-12 rounded-xl border-2 border-neutral-200 flex items-center justify-center text-xl text-neutral-300 hover:border-warning-500 hover:text-warning-500 transition-colors"
                    >
                      ★
                    </button>
                  ))}
                </div>
              )}

              {question.type === QUESTION_TYPES.DATE && (
                <input
                  type="date"
                  className="text-lg bg-transparent border-b-2 border-neutral-200 pb-2 outline-none focus:border-primary-500 transition-colors text-neutral-300"
                  readOnly
                />
              )}
            </div>
          )}
        </div>
      </main>

      {/* Navigation */}
      <footer className="p-8 flex justify-center gap-3">
        {!isFirst && (
          <Button
            variant="secondary"
            onClick={() => setCurrentStep((s) => s - 1)}
          >
            Back
          </Button>
        )}
        {!isLast ? (
          <Button onClick={() => setCurrentStep((s) => s + 1)}>
            {isWelcome ? 'Start' : 'Next'}
          </Button>
        ) : (
          <Button onClick={() => navigate(`/forms/${id}/edit`)}>
            {isThankYou ? 'Done' : 'Submit'}
          </Button>
        )}
      </footer>
    </div>
  )
}
