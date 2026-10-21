import { computed, ref } from 'vue'

const THEME_KEY = 'app_theme'

export type ThemeMode = 'light' | 'dark'

function getSystemTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const savedTheme = localStorage.getItem(THEME_KEY)

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return getSystemTheme()
}

function applyTheme(mode: ThemeMode): void {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.classList.toggle('dark', mode === 'dark')
  document.documentElement.style.colorScheme = mode
}

export const themeMode = ref<ThemeMode>(getInitialTheme())

applyTheme(themeMode.value)

export const isDarkTheme = computed(() => themeMode.value === 'dark')

export function setThemeMode(mode: ThemeMode): void {
  themeMode.value = mode
  localStorage.setItem(THEME_KEY, mode)
  applyTheme(mode)
}

export function toggleThemeMode(): void {
  setThemeMode(themeMode.value === 'dark' ? 'light' : 'dark')
}
