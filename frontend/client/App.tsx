import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import type { Location } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import FormPage from './pages/FormPage'

const defaultRoute = import.meta.env.VITE_DEV_BYPASS_LOGIN === 'true'
  ? '/home'
  : '/register'

type ModalLocationState = {
  backgroundLocation?: Location
}

function App() {
  const location = useLocation()
  const state = location.state as ModalLocationState | null
  const backgroundLocation = state?.backgroundLocation

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Navigate to={defaultRoute} replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/FormPage" element={<FormPage />} />
        <Route path="*" element={<Navigate to={defaultRoute} replace />} />
      </Routes>

      {backgroundLocation ? (
        <Routes>
          <Route path="/FormPage" element={<FormPage />} />
        </Routes>
      ) : null}
    </>
  )
}

export default App
