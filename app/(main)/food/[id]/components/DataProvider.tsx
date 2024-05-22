'use client'
import React, { ReactNode } from 'react'
import useFoodDetailStore, { Data } from '../stores/useFoodDetailStore'
import { useShallow } from 'zustand/react/shallow'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api'
import { useRouter } from 'next/navigation'

const DataProvider = ({ id, children }: { id: string; children: ReactNode }) => {
  const [setEatery, setMenuItem, setMenuItemOptions, setReviews, setIsLoading, setCurrentMenuItemOption] =
    useFoodDetailStore(
      useShallow((state) => [
        state.setEatery,
        state.setMenuItem,
        state.setMenuItemOptions,
        state.setReviews,
        state.setIsLoading,
        state.setCurrentMenuItemOption,
      ]),
    )

  const router = useRouter()

  useQuery({
    queryKey: ['menu-item-detail'],
    queryFn: async () => {
      try {
        setIsLoading(true)

        const response = await api.get(`/menu-item/${id}`)
        const data = response.data as Data
        console.log(data, 'data')
        setMenuItem({
          id: data.id,
          name: data.name,
          description: data.description,
          imageUrl: data.imageUrl,
        })
        setMenuItemOptions(data.menuItemOptions)
        setReviews(data.reviews)
        setEatery(data.eatery)
        setCurrentMenuItemOption(data.menuItemOptions[0] || null)

        setIsLoading(false)

        return response.data
      } catch (err) {
        // router.push('/food')
      }
    },
  })

  return <>{children}</>
}

export default DataProvider
