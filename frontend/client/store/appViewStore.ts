export type AppView = 'register' | 'login' | 'home'

export const defaultAppView: AppView =
  import.meta.env.VITE_DEV_BYPASS_LOGIN === 'true' ? 'home' : 'register'
