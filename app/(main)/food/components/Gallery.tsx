'use client'
import React, { useEffect } from 'react'
import ShowcaseCard from './ShowcaseCard'
import useFoodStore from '../stores/useFoodStore'
import { useShallow } from 'zustand/react/shallow'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api'
import LoadingSpinner from '@/components/LoadingSpinner'
import foodShowcasePlaceholder from '@/public/images/foodShowcasePlaceholder.png'

const Gallery = () => {
  const [setOriginalFoodList, setActiveSlide, shownFoodList, nameSearch] = useFoodStore(
    useShallow((state) => [state.setOriginalFoodList, state.setActiveSlide, state.shownFoodList, state.nameSearch]),
  )

  const { isLoading } = useQuery({
    queryKey: ['menu-item', nameSearch],
    queryFn: async () => {
      const response = await api.get(`/menu-item?name=${nameSearch}`)
      setOriginalFoodList(response.data)
      setActiveSlide(0)
      return response.data
    },
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['menu-item'] })
  }, [nameSearch, queryClient])

  if (isLoading) return <LoadingSpinner />

  if (shownFoodList.length === 0) return <div className="w-screen flex justify-center p-4">Không có dữ liệu</div>

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-4 w-fit mx-auto gap-8">
      {Array.isArray(shownFoodList) &&
        shownFoodList.map((item) => (
          <li key={item.id} className="hover:scale-105">
            <ShowcaseCard id={item.id} name={item.name} imageUrl={item.imageUrl || foodShowcasePlaceholder.src} />
          </li>
        ))}
    </ul>
  )
}

export default Gallery
