import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'

type AuthView = 'register' | 'login'

function App() {
  const [view, setView] = useState<AuthView>('register')

  return view === 'register' ? (
    <Register
      onRegistered={() => setView('login')}
      onSwitchToLogin={() => setView('login')}
    />
  ) : (
    <Login onSwitchToRegister={() => setView('register')} />
  )
}

export default App
