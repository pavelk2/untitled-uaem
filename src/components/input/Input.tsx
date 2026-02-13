import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({
  label,
  error,
  id,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-neutral-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          w-full px-4 py-2.5 rounded-xl
          bg-neutral-50 border border-neutral-200
          text-neutral-800 text-sm
          placeholder:text-neutral-400
          transition-all duration-150
          hover:border-neutral-300
          focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-error-500 focus:ring-error-500/20 focus:border-error-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-error-500">{error}</p>
      )}
    </div>
  )
}
