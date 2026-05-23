import { createHttpError } from '../models/errorModel.js'
import {
  validateLoginPayload,
  validateRegisterPayload,
} from '../models/authModel.js'
import {
  signInWithPassword,
  signUpWithPassword,
} from '../repositories/authRepository.js'
import { createProfile } from '../repositories/profileRepository.js'

export async function registerUserWithProfile(payload) {
  const { firstName, lastName, username, email, phone, password } =
    validateRegisterPayload(payload)

  const { data: signUpData, error: signUpError } = await signUpWithPassword({
    email,
    password,
    firstName,
    lastName,
    username,
    phone,
  })

  if (signUpError) {
    throw createHttpError(400, signUpError.message)
  }

  if (!signUpData.user) {
    throw createHttpError(400, 'User registration failed.')
  }

  const { error: profileError } = await createProfile({
    id: signUpData.user.id,
    first_name: firstName,
    last_name: lastName,
    username,
    email,
    phone,
  })

  if (profileError) {
    throw createHttpError(400, profileError.message)
  }

  return {
    message:
      'Registration successful. Check your email if confirmation is enabled in Supabase.',
  }
}

export async function loginUserWithEmail(payload) {
  const { email, password } = validateLoginPayload(payload)
  const { data, error } = await signInWithPassword({ email, password })

  if (error) {
    throw createHttpError(401, error.message)
  }

  return {
    message: 'Login successful.',
    session: data.session,
    user: data.user,
  }
}
