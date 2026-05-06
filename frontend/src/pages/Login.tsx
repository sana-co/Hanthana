import { type FormEvent, useState } from 'react'
import '../Register.css'
import AuthCard from '../components/auth/AuthCard'
import AuthDivider from '../components/auth/AuthDivider'
import AuthField from '../components/auth/AuthField'
import { LockIcon, MailIcon } from '../components/auth/AuthIcons'
import { postJson } from '../lib/api'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const errors = validate(values)
  const visibleErrors = submitted ? errors : {}

  function updateField(name: keyof LoginValues, value: string) {
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

      const response = await postJson<{
        message: string
        session: { access_token: string; refresh_token: string }
        user: { email?: string | null }
      }>('/auth/login', {
        email: values.emailOrPhone,
        password: values.password,
      })

      localStorage.setItem('hanthana.session', JSON.stringify(response.session))
      localStorage.setItem('hanthana.user', JSON.stringify(response.user))
      setSuccessMessage(response.message)
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Login failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthCard
      titleId="login-title"
      title="Hanthana"
      subtitle="Connect with your community"
      cardClassName="login-card"
      headerClassName="login-header"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <AuthField
          label="Email or Phone Number"
          name="emailOrPhone"
          type="text"
          value={values.emailOrPhone}
          error={visibleErrors.emailOrPhone}
          onChange={(name, value) => updateField(name as keyof LoginValues, value)}
          icon={<MailIcon />}
        />
        <AuthField
          label="Password"
          name="password"
          type="password"
          value={values.password}
          error={visibleErrors.password}
          onChange={(name, value) => updateField(name as keyof LoginValues, value)}
          icon={<LockIcon />}
        />

        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging In...' : 'Login'}
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
    </AuthCard>
  )
}

export default Login
