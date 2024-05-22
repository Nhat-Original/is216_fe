'use client'
import React from 'react'
import useFoodStore from '../stores/useFoodStore'
import { useShallow } from 'zustand/react/shallow'

const Pagnition = () => {
  const [originalFoodList, itemsPerSlide, activeSlide, increaseActiveSlide, decreaseActiveSlide] = useFoodStore(
    useShallow((state) => [
      state.originalFoodList,
      state.itemsPerSlide,
      state.activeSlide,
      state.increaseActiveSlide,
      state.decreaseActiveSlide,
    ]),
  )

  const lastSlide = Math.floor(originalFoodList.length / itemsPerSlide)

  const goToNextSlide = () => {
    increaseActiveSlide()
  }

  const goToPreviousSlide = () => {
    decreaseActiveSlide()
  }

  return (
    <div className="flex justify-center">
      <div className="join">
        <button className={`join-item btn ${activeSlide === 0 ? 'btn-disabled' : ''}`} onClick={goToPreviousSlide}>
          «
        </button>
        <button className="join-item btn disabled">{activeSlide + 1}</button>
        <button className={`join-item btn ${activeSlide === lastSlide ? 'btn-disabled' : ''}`} onClick={goToNextSlide}>
          »
        </button>
      </div>
    </div>
  )
}

export default Pagnition
