import axios from 'axios'
import { useTokenStore, userSessionStore } from '@/app/lib/store'
export const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  if (config.url === '/auth/login' || config.url === '/auth/register') {
    return config
  }
  const token = (useTokenStore.getState() as any).token === '' ? null : (useTokenStore.getState() as any).token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      userSessionStore.getState().logout()
      window.location.href = '/signin'
    }
    return Promise.reject(error)
  },
)
