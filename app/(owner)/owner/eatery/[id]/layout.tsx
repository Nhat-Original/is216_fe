'use client'
import SideNav from '@/app/(owner)/components/side-bar'
import React from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api'
const EateryLayout = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams<{ id: string }>()
  const { data } = useQuery({
    queryKey: ['eatery', id],
    queryFn: () => api.get(`/eatery/${id}`),
  })
  console.log('route')
  console.log(data)
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
