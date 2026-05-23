import dotenv from 'dotenv'

dotenv.config({ path: './server/.env' })

const port = process.env.PORT || 4000

const { default: app } = await import('./app.js')

app.listen(port, () => {
  console.log(`Auth server running on http://localhost:${port}`)
})
