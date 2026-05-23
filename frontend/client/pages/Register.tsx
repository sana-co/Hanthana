import { type FormEvent, useState } from 'react'
import '../styles/auth.css'
import AuthCard from '../components/auth/AuthCard'
import AuthDivider from '../components/auth/AuthDivider'
import AuthField from '../components/auth/AuthField'
import {
  LockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from '../components/auth/AuthIcons'
import { registerUser } from '../services/authService'

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
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(values.password)) {
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const errors = validate(values)
  const visibleErrors = submitted ? errors : {}

  function updateField(name: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    setServerError('')
    setSuccessMessage('')

    if (Object.keys(validate(values)).length > 0) {
      return
    }

    try {
      setIsSubmitting(true)
      const response = await registerUser({
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        phone: values.phone,
        password: values.password,
      })
      setSuccessMessage(response.message)
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : 'Registration failed.',
      )
      return
    } finally {
      setIsSubmitting(false)
    }

    onRegistered()
  }

  return (
    <AuthCard
      titleId="register-title"
      title="Hanthana"
      subtitle="Connect with your community"
      badge="Join Hanthana"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <AuthField
            label="First Name"
            name="firstName"
            type="text"
            value={values.firstName}
            error={visibleErrors.firstName}
            onChange={(name, value) => updateField(name as keyof FormValues, value)}
            icon={<UserIcon />}
          />
          <AuthField
            label="Last Name"
            name="lastName"
            type="text"
            value={values.lastName}
            error={visibleErrors.lastName}
            onChange={(name, value) => updateField(name as keyof FormValues, value)}
            icon={<UserIcon />}
          />
        </div>

        <AuthField
          label="Username"
          name="username"
          type="text"
          value={values.username}
          error={visibleErrors.username}
          onChange={(name, value) => updateField(name as keyof FormValues, value)}
          icon={<UserIcon />}
        />
        <AuthField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          error={visibleErrors.email}
          onChange={(name, value) => updateField(name as keyof FormValues, value)}
          icon={<MailIcon />}
        />
        <AuthField
          label="Phone Number"
          name="phone"
          type="tel"
          value={values.phone}
          error={visibleErrors.phone}
          onChange={(name, value) => updateField(name as keyof FormValues, value)}
          icon={<PhoneIcon />}
        />
        <AuthField
          label="Password"
          name="password"
          type="password"
          value={values.password}
          error={visibleErrors.password}
          onChange={(name, value) => updateField(name as keyof FormValues, value)}
          icon={<LockIcon />}
        />
        <AuthField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={visibleErrors.confirmPassword}
          onChange={(name, value) => updateField(name as keyof FormValues, value)}
          icon={<LockIcon />}
        />

        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Sign Up'}
        </button>

        {serverError ? (
          <p className="error-banner" role="alert">
            {serverError}
          </p>
        ) : null}

        {successMessage ? (
          <p className="success-message" role="status">
            {successMessage}
          </p>
        ) : null}

        <AuthDivider />

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
    </AuthCard>
  )
}

export default Register
