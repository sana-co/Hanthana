import { type FormEvent, type ReactNode, useState } from 'react'
import './FormPage.css'
import { createGroup, type Group } from '../services/groupService'

type GroupFormValues = {
  groupName: string
  groupTag: string
  description: string
  focus: string
  privacy: string
  rules: string
}

type FormPageProps = {
  isOpen: boolean
  onClose: () => void
  onCreated: (group: Group) => void
}

const initialValues: GroupFormValues = {
  groupName: '',
  groupTag: '',
  description: '',
  focus: '',
  privacy: 'Public',
  rules: '',
}

function FormPage({ isOpen, onClose, onCreated }: FormPageProps) {
  const [values, setValues] = useState<GroupFormValues>(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  if (!isOpen) {
    return null
  }

  function updateField(name: keyof GroupFormValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setServerError('')

    try {
      setIsSubmitting(true)
      const storedUser = localStorage.getItem('hanthana.user')
      const parsedUser = storedUser ? JSON.parse(storedUser) as { email?: string | null } : null
      const createdByName = 'Dummy Admin'
      const createdByTag = parsedUser?.email
        ? `@${parsedUser.email.split('@')[0]}`
        : '@admin'

      const response = await createGroup({
        ...values,
        createdByName,
        createdByTag,
      })

      setValues(initialValues)
      onCreated(response.group)
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : 'Failed to create group.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="group-form-page" role="dialog" aria-modal="true" aria-labelledby="create-group-title">
      <div className="group-form-overlay" onClick={onClose}>
        <section
          className="group-form-modal"
          aria-labelledby="create-group-title"
          onClick={(event) => event.stopPropagation()}
        >
          <header className="group-form-modal__header">
            <h1 id="create-group-title">Create New Group</h1>
            <button
              className="group-form-close"
              type="button"
              aria-label="Close create group form"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </header>

          <div className="group-form-modal__body">
            <form className="group-form" onSubmit={handleSubmit}>
              <FormField label="Group Name" required>
                <input
                  type="text"
                  value={values.groupName}
                  onChange={(event) => updateField('groupName', event.target.value)}
                  placeholder="Enter group name"
                />
              </FormField>

              <FormField
                label="Group Tag"
                required
                hint="Must be unique (e.g., @colombo-foodies)"
              >
                <input
                  type="text"
                  value={values.groupTag}
                  onChange={(event) => updateField('groupTag', event.target.value)}
                  placeholder="@unique-tag"
                />
              </FormField>

              <FormField label="Description">
                <textarea
                  value={values.description}
                  onChange={(event) => updateField('description', event.target.value)}
                  placeholder="Describe what your group is about..."
                  rows={5}
                />
              </FormField>

              <FormField label="Focus/Category">
                <input
                  type="text"
                  value={values.focus}
                  onChange={(event) => updateField('focus', event.target.value)}
                  placeholder="e.g. Photography, Food, Travel"
                />
              </FormField>

              <FormField label="Privacy" required>
                <select
                  value={values.privacy}
                  onChange={(event) => updateField('privacy', event.target.value)}
                >
                  <option>Public</option>
                  <option>Private</option>
                  <option>Invite Only</option>
                </select>
              </FormField>

              <FormField label="Community Rules">
                <textarea
                  value={values.rules}
                  onChange={(event) => updateField('rules', event.target.value)}
                  placeholder="Share any expectations, rules, or posting guidelines..."
                  rows={4}
                />
              </FormField>

              {serverError ? (
                <p className="group-form-error" role="alert">
                  {serverError}
                </p>
              ) : null}

              <footer className="group-form-modal__footer">
                <button
                  className="group-form-button group-form-button--ghost"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button className="group-form-button group-form-button--primary" type="submit">
                  {isSubmitting ? 'Creating...' : 'Create Group'}
                </button>
              </footer>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

type FormFieldProps = {
  label: string
  required?: boolean
  hint?: string
  children: ReactNode
}

function FormField({ label, required = false, hint, children }: FormFieldProps) {
  return (
    <label className="group-form-field">
      <span className="group-form-field__label">
        {label}
        {required ? <span className="group-form-field__required"> *</span> : null}
      </span>
      {children}
      {hint ? <span className="group-form-field__hint">{hint}</span> : null}
    </label>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </svg>
  )
}

export default FormPage
