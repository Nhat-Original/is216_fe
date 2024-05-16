import axios from 'axios'
import { useSessionStore, useTokenStore } from '@/stores/useSessionStore'
import { redirect } from 'next/navigation'

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
    if (typeof response.data === 'string') {
      response.data = JSON.parse(response.data)
    }
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401 && error.config.url !== '/auth/login') {
      useSessionStore.getState().logout()
      redirect('/signin')
    }
    return Promise.reject(error)
  },
)
