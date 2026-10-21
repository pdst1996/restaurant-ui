import { storeToRefs } from 'pinia'
import { pinia } from '@/stores'
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
  const auth = useAuthStore(pinia)
  const { isAuthenticated } = storeToRefs(auth)

  return { isAuthenticated, login: auth.login, logout: auth.logout }
}
