import { useState } from 'react'
import { Card } from '@/components/card/Card'
import { QUESTION_TYPES } from '@/utils/constants'

interface QuestionTypeSelectorProps {
  onSelect: (type: string) => void
}

const questionTypes = [
  {
    type: QUESTION_TYPES.SHORT_TEXT,
    label: 'Short Text',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M3 7h14M3 11h9" />
      </svg>
    ),
  },
  {
    type: QUESTION_TYPES.LONG_TEXT,
    label: 'Long Text',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M3 6h14M3 10h14M3 14h8" />
      </svg>
    ),
  },
  {
    type: QUESTION_TYPES.SINGLE_CHOICE,
    label: 'Single Choice',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="6" />
        <circle cx="10" cy="10" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    label: 'Multiple Choice',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="12" height="12" rx="2" />
        <path d="M7 10l2 2 4-4" />
      </svg>
    ),
  },
  {
    type: QUESTION_TYPES.EMAIL,
    label: 'Email',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="14" height="10" rx="2" />
        <path d="M3 7l7 4 7-4" />
      </svg>
    ),
  },
  {
    type: QUESTION_TYPES.RATING,
    label: 'Rating',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M10 3l2.5 5 5.5.8-4 3.9.9 5.3L10 15.5 5.1 18l.9-5.3-4-3.9L7.5 8z" />
      </svg>
    ),
  },
  {
    type: QUESTION_TYPES.DATE,
    label: 'Date',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="14" height="13" rx="2" />
        <path d="M3 8h14M7 2v4M13 2v4" />
      </svg>
    ),
  },
  {
    type: QUESTION_TYPES.PHONE,
    label: 'Phone',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="8" height="16" rx="2" />
        <path d="M9 15h2" />
      </svg>
    ),
  },
]

export function QuestionTypeSelector({ onSelect }: QuestionTypeSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full py-4 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-neutral-200 text-neutral-400 hover:border-primary-300 hover:text-primary-500 transition-colors"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M10 4v12M4 10h12" />
        </svg>
        <span className="text-sm font-medium">Add Question</span>
      </button>
    )
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-neutral-700">
          Choose question type
        </h3>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {questionTypes.map((qt) => (
          <button
            key={qt.type}
            onClick={() => {
              onSelect(qt.type)
              setIsExpanded(false)
            }}
            className="flex flex-col items-center gap-2 p-4 rounded-xl text-neutral-500 hover:bg-primary-50 hover:text-primary-600 transition-colors"
          >
            {qt.icon}
            <span className="text-xs font-medium">{qt.label}</span>
          </button>
        ))}
      </div>
    </Card>
  )
}
