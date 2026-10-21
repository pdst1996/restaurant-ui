import { pinia } from '@/stores'
import { useAuthStore } from '@/stores/auth'
import { session } from './session'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8088/api',
})

// Cuando tengamos JWT, esto lo manda en cada petición
http.interceptors.request.use((config) => {
  const token = session.get()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    const isAuthCall = err.config?.url?.startsWith('/auth/')
    if (err.response?.status === 401 && !isAuthCall) {
      useAuthStore(pinia).logout()
    }
    return Promise.reject(err)
  },
)

export default http
