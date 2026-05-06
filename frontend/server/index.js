import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: './server/.env' })

const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
]

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
}

const app = express()
const port = process.env.PORT || 4000

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  }),
)
app.use(express.json())

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
)

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/auth/register', async (req, res) => {
  const { firstName, lastName, username, email, phone, password } = req.body

  if (!firstName || !lastName || !username || !email || !phone || !password) {
    return res.status(400).json({ error: 'Missing required fields.' })
  }

  const normalizedEmail = String(email).trim().toLowerCase()

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: normalizedEmail,
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

  if (signUpError) {
    return res.status(400).json({ error: signUpError.message })
  }

  if (!signUpData.user) {
    return res.status(400).json({ error: 'User registration failed.' })
  }

  const { error: profileError } = await supabaseAdmin.from('profiles').insert({
    id: signUpData.user.id,
    first_name: firstName,
    last_name: lastName,
    username,
    email: normalizedEmail,
    phone,
  })

  if (profileError) {
    return res.status(400).json({ error: profileError.message })
  }

  return res.status(201).json({
    message:
      'Registration successful. Check your email if confirmation is enabled in Supabase.',
  })
})

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: String(email).trim().toLowerCase(),
    password,
  })

  if (error) {
    return res.status(401).json({ error: error.message })
  }

  return res.json({
    message: 'Login successful.',
    session: data.session,
    user: data.user,
  })
})

app.listen(port, () => {
  console.log(`Auth server running on http://localhost:${port}`)
})
