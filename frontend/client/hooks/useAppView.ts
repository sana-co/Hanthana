import { useState } from 'react'
import { defaultAppView, type AppView } from '../store/appViewStore'

export function useAppView() {
  const [view, setView] = useState<AppView>(defaultAppView)

  return {
    view,
    goToHome: () => setView('home'),
    goToLogin: () => setView('login'),
    goToRegister: () => setView('register'),
  }
}
