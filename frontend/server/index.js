import dotenv from 'dotenv'
import app from './app.js'

dotenv.config({ path: './server/.env' })

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Auth server running on http://localhost:${port}`)
})
