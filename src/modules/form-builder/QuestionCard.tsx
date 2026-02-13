import { Card } from '@/components/card/Card'
import { Input } from '@/components/input/Input'
import type { FormQuestion } from '@/store/slices/formsSlice'
import { QUESTION_TYPES } from '@/utils/constants'

interface QuestionCardProps {
  question: FormQuestion
  onUpdate: (question: FormQuestion) => void
  onRemove: () => void
}

const questionTypeLabels: Record<string, string> = {
  [QUESTION_TYPES.SHORT_TEXT]: 'Short Text',
  [QUESTION_TYPES.LONG_TEXT]: 'Long Text',
  [QUESTION_TYPES.SINGLE_CHOICE]: 'Single Choice',
  [QUESTION_TYPES.MULTIPLE_CHOICE]: 'Multiple Choice',
  [QUESTION_TYPES.EMAIL]: 'Email',
  [QUESTION_TYPES.PHONE]: 'Phone',
  [QUESTION_TYPES.RATING]: 'Rating',
  [QUESTION_TYPES.DATE]: 'Date',
  [QUESTION_TYPES.FILE_UPLOAD]: 'File Upload',
  [QUESTION_TYPES.WELCOME_SCREEN]: 'Welcome Screen',
  [QUESTION_TYPES.THANK_YOU_SCREEN]: 'Thank You Screen',
}

export function QuestionCard({
  question,
  onUpdate,
  onRemove,
}: QuestionCardProps) {
  return (
    <Card className="group relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
          {questionTypeLabels[question.type] ?? question.type}
        </span>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <label className="flex items-center gap-1.5 text-xs text-neutral-500 cursor-pointer">
            <input
              type="checkbox"
              checked={question.required}
              onChange={(e) =>
                onUpdate({ ...question, required: e.target.checked })
              }
              className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            />
            Required
          </label>
          <button
            onClick={onRemove}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-400 hover:bg-error-50 hover:text-error-500 transition-colors"
            aria-label="Remove question"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M2 4h10M5 4V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V4M11 4v7.5a1.5 1.5 0 01-1.5 1.5h-5A1.5 1.5 0 013 11.5V4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Title */}
      <Input
        value={question.title}
        onChange={(e) => onUpdate({ ...question, title: e.target.value })}
        placeholder="Type your question here..."
        className="text-base font-medium mb-2"
      />

      {/* Description */}
      {(question.type === QUESTION_TYPES.WELCOME_SCREEN ||
        question.type === QUESTION_TYPES.THANK_YOU_SCREEN) && (
        <input
          type="text"
          value={question.description ?? ''}
          onChange={(e) =>
            onUpdate({ ...question, description: e.target.value })
          }
          placeholder="Add a description..."
          className="w-full text-sm text-neutral-500 bg-transparent border-none outline-none mt-1 placeholder:text-neutral-300"
        />
      )}

      {/* Options for choice questions */}
      {(question.type === QUESTION_TYPES.SINGLE_CHOICE ||
        question.type === QUESTION_TYPES.MULTIPLE_CHOICE) &&
        question.options && (
          <div className="mt-4 flex flex-col gap-2">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border-2 border-neutral-300 flex-shrink-0" />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...question.options!]
                    newOptions[index] = e.target.value
                    onUpdate({ ...question, options: newOptions })
                  }}
                  className="flex-1 text-sm bg-transparent border-none outline-none text-neutral-700 placeholder:text-neutral-300"
                  placeholder={`Option ${index + 1}`}
                />
                {question.options!.length > 1 && (
                  <button
                    onClick={() => {
                      const newOptions = question.options!.filter(
                        (_, i) => i !== index,
                      )
                      onUpdate({ ...question, options: newOptions })
                    }}
                    className="text-neutral-300 hover:text-neutral-500 transition-colors"
                    aria-label="Remove option"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M3 3l8 8M11 3l-8 8" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() =>
                onUpdate({
                  ...question,
                  options: [
                    ...question.options!,
                    `Option ${question.options!.length + 1}`,
                  ],
                })
              }
              className="text-sm text-primary-500 hover:text-primary-600 font-medium mt-1 text-left"
            >
              + Add option
            </button>
          </div>
        )}

      {/* Preview hints for other types */}
      {question.type === QUESTION_TYPES.SHORT_TEXT && (
        <div className="mt-3 px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-sm text-neutral-300">
          Short answer text
        </div>
      )}
      {question.type === QUESTION_TYPES.LONG_TEXT && (
        <div className="mt-3 px-4 py-6 rounded-xl bg-neutral-50 border border-neutral-100 text-sm text-neutral-300">
          Long answer text
        </div>
      )}
      {question.type === QUESTION_TYPES.EMAIL && (
        <div className="mt-3 px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-sm text-neutral-300">
          email@example.com
        </div>
      )}
      {question.type === QUESTION_TYPES.RATING && (
        <div className="mt-3 flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className="w-8 h-8 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-300"
            >
              ★
            </div>
          ))}
        </div>
      )}
      {question.type === QUESTION_TYPES.DATE && (
        <div className="mt-3 px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-sm text-neutral-300">
          mm/dd/yyyy
        </div>
      )}
    </Card>
  )
}
