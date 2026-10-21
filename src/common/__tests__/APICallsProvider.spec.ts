import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AxiosError, AxiosHeaders } from 'axios'
import { ElMessage, ElNotification } from 'element-plus'
import APICallsProvider from '../APICallsProvider'
import Utils from '../Utils'
import http from '@/api/http'
import { setLocale } from '@/locales'
import type { components } from '@/api/api'

type ErrorResponse = components['schemas']['ErrorResponse']

function createHttpError(data: ErrorResponse | null): AxiosError<ErrorResponse | null> {
  return new AxiosError('Unauthorized', 'ERR_BAD_REQUEST', undefined, undefined, {
    data,
    status: 401,
    statusText: 'Unauthorized',
    headers: {},
    config: { headers: new AxiosHeaders() },
  })
}

vi.mock('@/api/http', () => ({
  default: { post: vi.fn<typeof http.post>() },
}))

vi.mock('element-plus', () => ({
  ElMessage: vi.fn<typeof ElMessage>(),
  ElNotification: vi.fn<typeof ElNotification>(),
}))

beforeEach(() => {
  vi.resetAllMocks()
  setLocale('es')
})

describe('APICallsProvider.login', () => {
  const params = { user: 'user@example.com', password: 'password' }

  it('envía las credenciales y devuelve el token y el usuario', async () => {
    const data = { token: 'test-token', user: { id: '1', email: params.user } }
    vi.mocked(http.post).mockResolvedValue({ data })

    await expect(APICallsProvider.login(params)).resolves.toEqual(data)
    expect(http.post).toHaveBeenCalledExactlyOnceWith('/auth/login', params)
    expect(ElNotification).not.toHaveBeenCalled()
  })

  it.each([
    ['un error de red', new AxiosError('Network Error', 'ERR_NETWORK')],
    ['un error sin datos', createHttpError({})],
    ['una respuesta vacía', createHttpError(null)],
    ['un error inesperado', new Error('Unauthorized')],
    ['un rechazo sin objeto de error', null],
  ])('devuelve null y muestra un mensaje de respaldo ante %s', async (_, error) => {
    vi.mocked(http.post).mockRejectedValue(error)

    await expect(APICallsProvider.login(params)).resolves.toBeNull()
    expect(ElNotification).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        title: 'Iniciar sesión',
        type: 'error',
        message: 'Error al iniciar sesión',
        duration: 4000,
      }),
    )
  })

  it('muestra el mensaje del servidor en el idioma activo', async () => {
    vi.mocked(http.post).mockRejectedValue(
      createHttpError({
        errorMessage: { es: 'Credenciales incorrectas', en: 'Invalid credentials' },
      }),
    )

    await expect(APICallsProvider.login(params)).resolves.toBeNull()
    expect(ElNotification).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Credenciales incorrectas' }),
    )
  })

  it('consulta las traducciones del idioma actual al llamar a login', async () => {
    setLocale('en')
    vi.mocked(http.post).mockRejectedValue(new Error('Network Error'))

    await expect(APICallsProvider.login(params)).resolves.toBeNull()
    expect(ElNotification).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        title: 'Sign in',
        type: 'error',
        message: 'Login error',
        duration: 4000,
      }),
    )
  })
})

describe.each([
  ['showMessage', ElMessage],
  ['showNotification', ElNotification],
] as const)('Utils.%s', (method, display) => {
  it.each([
    [
      'el idioma activo',
      { errorMessage: { es: 'Mensaje español', default: 'Default' } },
      'Mensaje español',
    ],
    [
      'el idioma predeterminado',
      { errorMessage: { en: 'English', default: 'Default' } },
      'Default',
    ],
    ['el mensaje de respaldo si falta el idioma', { errorMessage: { en: 'English' } }, 'Respaldo'],
    ['el mensaje de respaldo si falta la respuesta', undefined, 'Respaldo'],
  ])('utiliza %s', (_, response, expected) => {
    Utils[method]('warning', 'Respaldo', response, 'Título')

    expect(display).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ message: expected, type: 'warning' }),
    )
  })

  it('respeta los cambios de idioma', () => {
    setLocale('en')

    Utils[method]('info', 'Respaldo', { errorMessage: { es: 'Español', en: 'English' } }, 'Título')

    expect(display).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'English', type: 'info' }),
    )
  })
})
