/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import SideNav from '@/app/(owner)/components/side-bar'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api'
import type { Owner } from '../../store/ownerStore'
import { useStore } from 'zustand'
import { EateryStore } from '../../store/ownerStore'
const EateryLayout = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams<{ id: string }>()
  const eateryStore = useStore(EateryStore)
  const { data, isSuccess } = useQuery({
    queryKey: ['eatery', id],
    queryFn: () => api.get(`/eatery/${id}`),
  })
  useEffect(() => {
    if (isSuccess && data.data) {
      const dt = {
        name: data.data.name,
        menu_id: data.data.menu.id,
      }
      eateryStore.setEatery(dt as Owner)
    }
  }, [isSuccess])
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  )
}
export default EateryLayout
