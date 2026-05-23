import cors from 'cors'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import healthRoutes from './routes/healthRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'
import { notFoundHandler } from './middleware/notFoundHandler.js'

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  }),
)
app.use(express.json())

app.use(healthRoutes)
app.use('/auth', authRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
