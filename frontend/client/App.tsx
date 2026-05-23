import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAppView } from './hooks/useAppView'

function App() {
  const { view, goToHome, goToLogin, goToRegister } = useAppView()

  if (view === 'register') {
    return (
      <Register onRegistered={goToHome} onSwitchToLogin={goToLogin} />
    )
  }

  if (view === 'login') {
    return <Login onSwitchToRegister={goToRegister} />
  }

  return <Home />
}

export default App
