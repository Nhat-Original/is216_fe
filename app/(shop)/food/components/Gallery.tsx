'use client'
import React from 'react'
import ShowcaseCard from './ShowcaseCard'
import useFoodStore from '../stores/useFoodStore'
import { useShallow } from 'zustand/react/shallow'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api'
import LoadingSpinner from '@/components/LoadingSpinner'

const Gallery = () => {
  const [setOriginalFoodList, setActiveSlide, shownFoodList] = useFoodStore(
    useShallow((state) => [state.setOriginalFoodList, state.setActiveSlide, state.shownFoodList]),
  )

  const { isLoading } = useQuery({
    queryKey: ['menu-item'],
    queryFn: async () => {
      const response = await api.get('/menu-item')
      setOriginalFoodList(response.data)
      setActiveSlide(0)
      return response.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  if (shownFoodList.length === 0) return <div className="w-screen flex justify-center p-4">Không có dữ liệu</div>

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 w-fit mx-auto">
      {Array.isArray(shownFoodList) &&
        shownFoodList.map((item) => (
          <li key={item.id}>
            <ShowcaseCard id={item.id} name={item.name} imageUrl={item.imageUrl} />
          </li>
        ))}
    </ul>
  )
}

export default Gallery
