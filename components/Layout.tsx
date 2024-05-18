'use client'
import { ReactNode } from 'react'

import { useSessionStore } from '@/stores/useSessionStore'
import { useStore } from 'zustand'
import React from 'react'

export const Layout = ({ children }: { children: ReactNode }) => {
  const { login } = useStore(useSessionStore)
  React.useEffect(() => {
    console.log('login')
    login()
  }, [login])
  return <div>{children}</div>
}
