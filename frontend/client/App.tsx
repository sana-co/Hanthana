import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const defaultRoute = import.meta.env.VITE_DEV_BYPASS_LOGIN === 'true'
  ? '/home'
  : '/register'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={defaultRoute} replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to={defaultRoute} replace />} />
    </Routes>
  )
}

export default App
