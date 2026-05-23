import { postJson } from './api'

type SessionPayload = {
  access_token: string
  refresh_token: string
}

type UserPayload = {
  email?: string | null
}

type LoginRequest = {
  email: string
  password: string
}

type RegisterRequest = {
  firstName: string
  lastName: string
  username: string
  email: string
  phone: string
  password: string
}

export type LoginResponse = {
  message: string
  session: SessionPayload
  user: UserPayload
}

export type RegisterResponse = {
  message: string
}

export async function loginUser(body: LoginRequest) {
  const response = await postJson<LoginResponse>('/auth/login', body)

  localStorage.setItem('hanthana.session', JSON.stringify(response.session))
  localStorage.setItem('hanthana.user', JSON.stringify(response.user))

  return response
}

export function registerUser(body: RegisterRequest) {
  return postJson<RegisterResponse>('/auth/register', body)
}
