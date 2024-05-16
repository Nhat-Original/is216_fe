'use client'
import React, { ReactNode, useEffect } from 'react'
import { useSessionStore } from '@/stores/useSessionStore'
import { useStore } from 'zustand'

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { login } = useStore(useSessionStore)

  useEffect(() => {
    login()
  }, [login])

  return <>{children}</>
}

export default SessionProvider
