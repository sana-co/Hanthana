import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Location } from 'react-router-dom'
import './FormPage.css'

type GroupFormValues = {
  groupName: string
  groupTag: string
  description: string
  focus: string
  privacy: string
  rules: string
}

type ModalLocationState = {
  backgroundLocation?: Location
}

const initialValues: GroupFormValues = {
  groupName: '',
  groupTag: '',
  description: '',
  focus: '',
  privacy: 'Public',
  rules: '',
}

function FormPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [values, setValues] = useState<GroupFormValues>(initialValues)
  const hasBackgroundLocation = Boolean(
    (location.state as ModalLocationState | null)?.backgroundLocation,
  )

  function updateField(name: keyof GroupFormValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  function handleClose() {
    if (hasBackgroundLocation) {
      navigate(-1)
      return
    }

    navigate('/home')
  }

  return (
    <div className="group-form-page">
      <div className="group-form-overlay">
        <section className="group-form-modal" aria-labelledby="create-group-title">
          <header className="group-form-modal__header">
            <h1 id="create-group-title">Create New Group</h1>
            <button
              className="group-form-close"
              type="button"
              aria-label="Close create group form"
              onClick={handleClose}
            >
              <CloseIcon />
            </button>
          </header>

          <div className="group-form-modal__body">
            <form className="group-form">
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
            </form>
          </div>

          <footer className="group-form-modal__footer">
            <button
              className="group-form-button group-form-button--ghost"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className="group-form-button group-form-button--primary" type="button">
              Create Group
            </button>
          </footer>
        </section>
      </div>
    </div>
  )
}

type FormFieldProps = {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
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
