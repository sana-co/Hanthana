import { type FormEvent, type ReactNode, useState } from 'react'
import '../Register.css'

type LoginProps = {
  onSwitchToRegister: () => void
}

type LoginValues = {
  emailOrPhone: string
  password: string
}

type LoginErrors = Partial<Record<keyof LoginValues, string>>

const initialValues: LoginValues = {
  emailOrPhone: '',
  password: '',
}

function validate(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {}

  if (!values.emailOrPhone.trim()) {
    errors.emailOrPhone = 'Email or phone number is required.'
  }

  if (!values.password) {
    errors.password = 'Password is required.'
  }

  return errors
}

function Login({ onSwitchToRegister }: LoginProps) {
  const [values, setValues] = useState<LoginValues>(initialValues)
  const [submitted, setSubmitted] = useState(false)

  const errors = validate(values)
  const hasErrors = Object.keys(errors).length > 0
  const visibleErrors = submitted ? errors : {}

  function updateField(name: keyof LoginValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)

    if (Object.keys(validate(values)).length > 0) {
      return
    }

    console.log('Login submitted:', values)
  }

  return (
    <main className="auth-shell">
      <section className="auth-card login-card" aria-labelledby="login-title">
        <header className="auth-header login-header">
          <h1 id="login-title">Hanthana</h1>
          <p className="auth-subtitle">Connect with your community</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <Field
            label="Email or Phone Number"
            name="emailOrPhone"
            type="text"
            value={values.emailOrPhone}
            error={visibleErrors.emailOrPhone}
            onChange={updateField}
            icon={<MailIcon />}
          />
          <Field
            label="Password"
            name="password"
            type="password"
            value={values.password}
            error={visibleErrors.password}
            onChange={updateField}
            icon={<LockIcon />}
          />

          <button className="submit-button" type="submit">
            Login
          </button>

          {submitted && !hasErrors ? (
            <p className="success-message" role="status">
              Login form is ready to connect to your backend auth.
            </p>
          ) : null}

          <div className="divider" aria-hidden="true">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <button className="google-button" type="button">
            <span className="google-mark" aria-hidden="true"></span>
            Continue with Google
          </button>

          <p className="switch-auth">
            Don&apos;t have an account?{' '}
            <button className="text-link" type="button" onClick={onSwitchToRegister}>
              Register
            </button>
          </p>

          <p className="auth-secondary-action">
            <button className="text-link secondary-link" type="button">
              Forgot password?
            </button>
          </p>
        </form>
      </section>
    </main>
  )
}

type FieldProps = {
  label: string
  name: keyof LoginValues
  type: string
  value: string
  error?: string
  onChange: (name: keyof LoginValues, value: string) => void
  icon: ReactNode
}

function Field({
  label,
  name,
  type,
  value,
  error,
  onChange,
  icon,
}: FieldProps) {
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

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5Z" />
      <path d="m5 8 7 5 7-5" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="6" y="10" width="12" height="10" rx="2" />
      <path d="M9 10V7.5a3 3 0 1 1 6 0V10" />
    </svg>
  )
}

export default Login
