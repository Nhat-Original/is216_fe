'use client'
import React, { useEffect } from 'react'
import ShowcaseCard from './ShowcaseCard'
import useFoodStore from '../stores/useFoodStore'
import { useShallow } from 'zustand/react/shallow'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api'

const Gallery = () => {
  const [setOriginalFoodList, setActiveSlide, shownFoodList] = useFoodStore(
    useShallow((state) => [state.setOriginalFoodList, state.setActiveSlide, state.shownFoodList]),
  )

  const { data: responseData, isLoading } = useQuery({ queryKey: ['menu-item'], queryFn: () => api.get('/menu-item') })

  useEffect(() => {
    setOriginalFoodList(responseData?.data || [])
    setActiveSlide(0)
  }, [setActiveSlide, setOriginalFoodList, responseData])

  if (isLoading)
    return (
      <div className="w-screen flex justify-center p-4">
        <span className="loading loading-spinner"></span>
      </div>
    )

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
