import {
  getSupabaseClient,
} from '../services/supabaseService.js'

export function signUpWithPassword({
  email,
  password,
  firstName,
  lastName,
  username,
  phone,
}) {
  return getSupabaseClient().auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        username,
        phone,
      },
    },
  })
}

export function signInWithPassword({ email, password }) {
  return getSupabaseClient().auth.signInWithPassword({
    email,
    password,
  })
}
