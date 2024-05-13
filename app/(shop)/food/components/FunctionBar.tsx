'use client'
import React from 'react'
import useFoodStore from '../stores/useFoodStore'
import { useShallow } from 'zustand/react/shallow'

const FunctionBar = () => {
  const [activeSlide, itemsPerSlide, shownFoodList, originalFoodList] = useFoodStore(
    useShallow((state) => [state.activeSlide, state.itemsPerSlide, state.shownFoodList, state.originalFoodList]),
  )

  const start = activeSlide * itemsPerSlide + 1

  if (originalFoodList.length === 0)
    return (
      <div className="flex items-center justify-center w-screen h-[50px] bg-secondary">
        <div>Không có món ăn để hiển thị</div>
      </div>
    )

  return (
    <div className="flex items-center justify-center w-screen h-[50px] bg-secondary">
      <div>
        Hiển thị món ăn{' '}
        <span className="font-bold">
          {start} - {start + shownFoodList.length - 1}
        </span>{' '}
        trên tổng số <span className="font-bold">{originalFoodList.length}</span> món ăn
      </div>
    </div>
  )
}

export default FunctionBar
