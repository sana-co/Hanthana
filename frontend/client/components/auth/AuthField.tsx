import type { ReactNode } from 'react'

type AuthFieldProps = {
  label: string
  name: string
  type: string
  value: string
  error?: string
  onChange: (name: string, value: string) => void
  icon: ReactNode
}

function AuthField({
  label,
  name,
  type,
  value,
  error,
  onChange,
  icon,
}: AuthFieldProps) {
  const fieldId = `field-${name}`
  const errorId = `${fieldId}-error`

  return (
    <label className={`field ${error ? 'field-error' : ''}`} htmlFor={fieldId}>
      <span className="sr-only">{label}</span>
      <div className="input-wrap">
        <span className="field-icon" aria-hidden="true">
          {icon}
        </span>
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          placeholder={label}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(name, event.target.value)}
        />
      </div>
      <span className="error-text" id={error ? errorId : undefined}>
        {error ?? ''}
      </span>
    </label>
  )
}

export default AuthField
