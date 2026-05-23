import {
  loginUserWithEmail,
  registerUserWithProfile,
} from '../services/authService.js'

export async function register(req, res, next) {
  try {
    const response = await registerUserWithProfile(req.body)
    return res.status(201).json(response)
  } catch (error) {
    return next(error)
  }
}

export async function login(req, res, next) {
  try {
    const response = await loginUserWithEmail(req.body)
    return res.json(response)
  } catch (error) {
    return next(error)
  }
}
