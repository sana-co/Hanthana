import { type FormEvent, type ReactNode, useState } from 'react'
import '../Register.css'

type RegisterProps = {
  onRegistered: () => void
  onSwitchToLogin: () => void
}

type FormValues = {
  firstName: string
  lastName: string
  username: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>
const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^\+?\d{10,15}$/

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.firstName.trim()) {
    errors.firstName = 'First name is required.'
  } else if (!/^[A-Za-z]{2,}$/.test(values.firstName.trim())) {
    errors.firstName = 'Use at least 2 letters.'
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Last name is required.'
  } else if (!/^[A-Za-z]{2,}$/.test(values.lastName.trim())) {
    errors.lastName = 'Use at least 2 letters.'
  }

  if (!values.username.trim()) {
    errors.username = 'Username is required.'
  } else if (!/^[a-zA-Z0-9._]{4,20}$/.test(values.username.trim())) {
    errors.username = '4-20 chars using letters, numbers, . or _.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (!phonePattern.test(values.phone.trim())) {
    errors.phone = 'Use 10-15 digits, optional + prefix.'
  }

  if (!values.password) {
    errors.password = 'Password is required.'
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(values.password)
  ) {
    errors.password = '8+ chars with upper, lower, and number.'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return errors
}

function Register({ onRegistered, onSwitchToLogin }: RegisterProps) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [submitted, setSubmitted] = useState(false)

  const errors = validate(values)

  const visibleErrors = submitted ? errors : {}

  function updateField(name: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSubmitted(true)

    if (Object.keys(validate(values)).length > 0) {
      return
    }

    console.log('Form submitted:', values)
    onRegistered()
  }

  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="register-title">
        <header className="auth-header">
          <p className="auth-badge">Join Hanthana</p>
          <h1 id="register-title">Hanthana</h1>
          <p className="auth-subtitle">Connect with your community</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <Field
              label="First Name"
              name="firstName"
              type="text"
              value={values.firstName}
              error={visibleErrors.firstName}
              onChange={updateField}
              icon={<UserIcon />}
            />
            <Field
              label="Last Name"
              name="lastName"
              type="text"
              value={values.lastName}
              error={visibleErrors.lastName}
              onChange={updateField}
              icon={<UserIcon />}
            />
          </div>

          <Field
            label="Username"
            name="username"
            type="text"
            value={values.username}
            error={visibleErrors.username}
            onChange={updateField}
            icon={<UserIcon />}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={values.email}
            error={visibleErrors.email}
            onChange={updateField}
            icon={<MailIcon />}
          />
          <Field
            label="Phone Number"
            name="phone"
            type="tel"
            value={values.phone}
            error={visibleErrors.phone}
            onChange={updateField}
            icon={<PhoneIcon />}
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
          <Field
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            error={visibleErrors.confirmPassword}
            onChange={updateField}
            icon={<LockIcon />}
          />

          <button className="submit-button" type="submit">
            Sign Up
          </button>

          <div className="divider" aria-hidden="true">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <button className="google-button" type="button">
            <span className="google-mark" aria-hidden="true"></span>
            Sign up with Google
          </button>

          <p className="switch-auth">
            Already have an account?{' '}
            <button className="text-link" type="button" onClick={onSwitchToLogin}>
              Login
            </button>
          </p>
        </form>
      </section>
    </main>
  )
}

type FieldProps = {
  label: string
  name: keyof FormValues
  type: string
  value: string
  error?: string
  onChange: (name: keyof FormValues, value: string) => void
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

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M5 19a7 7 0 0 1 14 0" />
    </svg>
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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8.7 4.8 7 6.5a2 2 0 0 0-.4 2.3 19 19 0 0 0 8.6 8.6 2 2 0 0 0 2.3-.4l1.7-1.7a1.8 1.8 0 0 0-.4-2.9l-2.5-1.2a1.8 1.8 0 0 0-2 .4l-.7.7a14 14 0 0 1-3.3-3.3l.7-.7a1.8 1.8 0 0 0 .4-2L11.6 5a1.8 1.8 0 0 0-2.9-.2Z" />
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

export default Register
