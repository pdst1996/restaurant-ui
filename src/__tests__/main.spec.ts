import { afterEach, expect, it, vi } from 'vitest'
import { getActivePinia } from 'pinia'

const state = vi.hoisted(() => ({ app: undefined as import('vue').App | undefined }))

vi.mock('@/App.vue', async () => {
  const { getCurrentInstance } = await import('vue')
  return {
    default: {
      setup() {
        state.app = getCurrentInstance()?.appContext.app
        return () => null
      },
    },
  }
})

afterEach(() => {
  state.app?.unmount()
  state.app = undefined
  document.body.replaceChildren()
  localStorage.clear()
})

it('arranca con Pinia disponible antes de la primera navegación', async () => {
  localStorage.clear()
  localStorage.setItem('app_theme', 'light')
  const container = document.createElement('div')
  container.id = 'app'
  document.body.append(container)

  await import('@/main')
  const { default: router } = await import('@/router')
  const { pinia } = await import('@/stores')

  await router.isReady()

  expect(getActivePinia()).toBe(pinia)
  expect(router.currentRoute.value.name).toBe('login')
  expect(container.hasAttribute('data-v-app')).toBe(true)
})
