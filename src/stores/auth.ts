import { computed, onScopeDispose, ref } from 'vue'
import { defineStore } from 'pinia'
import { getExpiry, isExpired, session } from '@/api/session'
import { authService } from '@/api/authService'
import type { UserResponse } from '@/api/types'

const MAX_TIMEOUT = 2_147_483_647

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(session.get())
  const user = ref<UserResponse | null>(null)
  let timer: number | undefined

  const isAuthenticated = computed(() => !!token.value)

  function logout() {
    clearTimeout(timer)
    token.value = null
    user.value = null
    session.clear()
  }

  function checkSession(): boolean {
    if (token.value && isExpired(token.value)) logout()
    return !!token.value
  }

  function scheduleExpiry() {
    clearTimeout(timer)
    if (!token.value) return
    const exp = getExpiry(token.value)
    if (exp === null) return
    const delay = Math.min(Math.max(exp - Date.now(), 0), MAX_TIMEOUT)
    timer = window.setTimeout(() => {
      if (checkSession()) scheduleExpiry()
    }, delay)
  }

  function login(newToken: string) {
    token.value = newToken
    user.value = null
    session.set(newToken)
    if (checkSession()) scheduleExpiry()
  }

  async function init() {
    if (!checkSession()) return
    scheduleExpiry()
    try {
      user.value = await authService.me()
    } catch {
      // El interceptor cierra la sesión ante un 401, no ante errores de red.
    }
  }

  function syncToken(newToken: string | null) {
    token.value = newToken
    user.value = null
    if (checkSession()) scheduleExpiry()
    else clearTimeout(timer)
  }

  onScopeDispose(() => clearTimeout(timer))

  return { token, user, isAuthenticated, login, logout, checkSession, init, syncToken }
})
