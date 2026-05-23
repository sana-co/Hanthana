import { createHttpError } from './errorModel.js'

export function normalizeEmail(email) {
  return String(email).trim().toLowerCase()
}

export function validateRegisterPayload(payload) {
  const { firstName, lastName, username, email, phone, password } = payload

  if (!firstName || !lastName || !username || !email || !phone || !password) {
    throw createHttpError(400, 'Missing required fields.')
  }

  return {
    firstName,
    lastName,
    username,
    email: normalizeEmail(email),
    phone,
    password,
  }
}

export function validateLoginPayload(payload) {
  const { email, password } = payload

  if (!email || !password) {
    throw createHttpError(400, 'Email and password are required.')
  }

  return {
    email: normalizeEmail(email),
    password,
  }
}
