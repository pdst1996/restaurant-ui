import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { setActivePinia } from 'pinia'
import { AxiosError, type AxiosAdapter } from 'axios'
import { pinia } from '@/stores'
import { useAuthStore } from '@/stores/auth'
import { useAuth } from '@/composables/useAuth'
import { session } from '@/api/session'
import { authService } from '@/api/authService'
import http from '@/api/http'
import router from '@/router'

vi.mock('@/api/authService', () => ({
  authService: { me: vi.fn<() => Promise<null>>() },
}))

vi.mock('@/views/HomeView.vue', () => ({ default: {} }))
vi.mock('@/views/LoginView.vue', () => ({ default: {} }))
vi.mock('@/views/NotFoundView.vue', () => ({ default: {} }))
vi.mock('@/views/orders/OrderView.vue', () => ({ default: {} }))
vi.mock('@/layouts/MainLayout.vue', () => ({ default: {} }))

function createToken(expiresInSeconds = 60): string {
  const payload = btoa(JSON.stringify({ exp: Date.now() / 1000 + expiresInSeconds }))
  return `header.${payload}.signature`
}

beforeEach(async () => {
  vi.useFakeTimers()
  vi.clearAllMocks()
  localStorage.clear()
  useAuthStore(pinia).logout()
  setActivePinia(undefined)
  await router.push('/login')
})

afterEach(() => {
  useAuthStore(pinia).logout()
  setActivePinia(undefined)
  vi.useRealTimers()
})

describe('sesión compartida con Pinia', () => {
  it('usa la misma store en el login y las rutas sin depender de una Pinia activa', async () => {
    setActivePinia(undefined)
    const auth = useAuth()
    const token = createToken()

    auth.login(token)
    setActivePinia(undefined)
    await router.push('/orders')

    expect(router.currentRoute.value.name).toBe('orders')
    expect(auth.isAuthenticated.value).toBe(true)
    expect(useAuthStore(pinia).token).toBe(token)
    expect(session.get()).toBe(token)
    expect(localStorage.getItem('auth_token')).toBeNull()
  })

  it('redirige a login y conserva el destino cuando no hay sesión', async () => {
    setActivePinia(undefined)
    await router.push('/orders?table=2')

    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query.redirect).toBe('/orders?table=2')
  })

  it('cierra la sesión tanto en la store como en el composable', async () => {
    const auth = useAuth()
    auth.login(createToken())
    await router.push('/orders')

    auth.logout()
    await router.push('/')

    expect(router.currentRoute.value.name).toBe('login')
    expect(auth.isAuthenticated.value).toBe(false)
    expect(useAuthStore(pinia).token).toBeNull()
    expect(session.get()).toBeNull()
  })

  it('elimina una sesión vencida al navegar', async () => {
    useAuthStore(pinia).login(createToken())
    vi.setSystemTime(Date.now() + 61_000)

    await router.push('/orders')

    expect(router.currentRoute.value.name).toBe('login')
    expect(session.get()).toBeNull()
  })

  it('cierra la sesión automáticamente cuando vence el token', () => {
    const auth = useAuth()
    auth.login(createToken())

    vi.advanceTimersByTime(61_000)

    expect(auth.isAuthenticated.value).toBe(false)
    expect(session.get()).toBeNull()
  })

  it('inicializa el usuario de una sesión vigente', async () => {
    const user = { id: '1', user: 'test' }
    useAuthStore(pinia).login(createToken())
    vi.mocked(authService.me).mockResolvedValue(user)

    await useAuthStore(pinia).init()

    expect(authService.me).toHaveBeenCalledOnce()
    expect(useAuthStore(pinia).user).toEqual(user)
  })

  it('envía el token del login en las peticiones HTTP', async () => {
    const token = createToken()
    useAuth().login(token)
    const adapter = vi.fn<AxiosAdapter>(async (config) => ({
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    }))

    await http.get('/orders', { adapter })

    expect(adapter).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: `Bearer ${token}` }),
      }),
    )
  })

  it.each([
    ['/orders', 401, false],
    ['/auth/login', 401, true],
    ['/orders', 500, true],
  ])('maneja %s con estado %i sin perder la store', async (url, status, authenticated) => {
    const auth = useAuth()
    auth.login(createToken())
    const adapter: AxiosAdapter = async (config) => {
      throw new AxiosError('Request failed', 'ERR_BAD_RESPONSE', config, undefined, {
        data: {},
        status,
        statusText: 'Error',
        headers: {},
        config,
      })
    }
    setActivePinia(undefined)

    await expect(http.get(url, { adapter })).rejects.toBeInstanceOf(AxiosError)
    expect(auth.isAuthenticated.value).toBe(authenticated)
    expect(session.get() !== null).toBe(authenticated)
  })
})
