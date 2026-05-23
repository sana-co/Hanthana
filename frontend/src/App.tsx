import { useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

type AppView = 'register' | 'login' | 'home'

const defaultView: AppView =
  import.meta.env.VITE_DEV_BYPASS_LOGIN === 'true' ? 'home' : 'register'

function App() {
  const [view, setView] = useState<AppView>(defaultView)

  if (view === 'register') {
    return (
      <Register
        onRegistered={() => setView('home')}
        onSwitchToLogin={() => setView('login')}
      />
    )
  }

  if (view === 'login') {
    return <Login onSwitchToRegister={() => setView('register')} />
  }

  return <Home />
}

export default App
