import axios from 'axios'

import { useSessionStore, useTokenStore } from '@/stores/useSessionStore'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
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
    if (error.response && error.response.status === 401 && error.config.url !== '/auth/login') {
      useSessionStore.getState().logout()
      window.location.href = '/signin'
    } else if (error.response && error.response.status === 403) {
      window.location.href = '/'
    }
    return Promise.reject(error)
  },
)
