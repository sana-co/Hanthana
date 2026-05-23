import { createHttpError } from './errorModel.js'

function normalizeTag(tag) {
  const trimmed = String(tag).trim().toLowerCase()
  return trimmed.startsWith('@') ? trimmed : `@${trimmed}`
}

function normalizeFocus(focus) {
  return String(focus || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function validateCreateGroupPayload(payload) {
  const groupName = String(payload.groupName || '').trim()
  const groupTagInput = String(payload.groupTag || '').trim()
  const description = String(payload.description || '').trim()
  const focus = String(payload.focus || '').trim()
  const privacy = String(payload.privacy || '').trim()
  const rules = String(payload.rules || '').trim()
  const createdByName = String(payload.createdByName || '').trim()
  const createdByTag = String(payload.createdByTag || '').trim()

  if (!groupName) {
    throw createHttpError(400, 'Group name is required.')
  }

  if (!groupTagInput) {
    throw createHttpError(400, 'Group tag is required.')
  }

  if (!privacy) {
    throw createHttpError(400, 'Privacy is required.')
  }

  return {
    groupName,
    groupTag: normalizeTag(groupTagInput),
    description,
    focus,
    focusItems: normalizeFocus(focus),
    privacy,
    rules,
    createdByName: createdByName || 'Dummy Admin',
    createdByTag: createdByTag || '@admin',
  }
}
