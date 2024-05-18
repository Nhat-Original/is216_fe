'use client'
import React from 'react'
import useFoodStore from '../stores/useFoodStore'
import { useShallow } from 'zustand/react/shallow'

const FunctionBar = () => {
  const [activeSlide, itemsPerSlide, shownFoodList, originalFoodList, nameSearch, setNameSearch] = useFoodStore(
    useShallow((state) => [
      state.activeSlide,
      state.itemsPerSlide,
      state.shownFoodList,
      state.originalFoodList,
      state.nameSearch,
      state.setNameSearch,
    ]),
  )

  const start = activeSlide * itemsPerSlide + 1

  return (
    <div className="flex items-center justify-around  w-full h-[50px] bg-secondary p-4">
      {shownFoodList.length > 0 ? (
        <div>
          Hiển thị{' '}
          <span className="font-bold">
            {start} - {start + shownFoodList.length - 1}
          </span>{' '}
          trên <span className="font-bold">{originalFoodList.length}</span> món ăn
        </div>
      ) : (
        <div>
          Hiển thị <span className="font-bold">0</span> món ăn
        </div>
      )}

      <div>
        <label className="input input-sm input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Tìm tên món ăn"
            value={nameSearch}
            onChange={(e) => {
              setNameSearch(e.target.value)
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
    </div>
  )
}

export default FunctionBar
