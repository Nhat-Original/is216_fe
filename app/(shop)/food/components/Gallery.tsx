'use client'
import React, { useEffect } from 'react'
import ShowcaseCard from './ShowcaseCard'
import useFoodStore from '../stores/useFoodStore'
import { useShallow } from 'zustand/react/shallow'

const dummyData = [
  {
    name: 'cơm gà 1',
    price: 9999999,
  },
  {
    name: 'cơm gà 2',
    price: 9999999,
  },
  {
    name: 'cơm gà 3',
    price: 9999999,
  },
  {
    name: 'cơm gà 4',
    price: 9999999,
  },
  {
    name: 'cơm gà 5',
    price: 9999999,
  },
  {
    name: 'cơm gà 6',
    price: 9999999,
  },
  {
    name: 'cơm gà 7',
    price: 9999999,
  },
  {
    name: 'cơm gà 8',
    price: 9999999,
  },
  {
    name: 'cơm gà 9',
    price: 9999999,
  },
  {
    name: 'cơm gà 10',
    price: 9999999,
  },
  {
    name: 'cơm gà 11',
    price: 9999999,
  },
  {
    name: 'cơm gà 12',
    price: 9999999,
  },
  {
    name: 'cơm gà 13',
    price: 9999999,
  },
  {
    name: 'cơm gà 14',
    price: 9999999,
  },
  {
    name: 'cơm gà 15',
    price: 9999999,
  },
  {
    name: 'cơm gà 16',
    price: 9999999,
  },
  {
    name: 'cơm gà 17',
    price: 9999999,
  },
  {
    name: 'cơm gà 18',
    price: 9999999,
  },
  {
    name: 'cơm gà 19',
    price: 9999999,
  },
  {
    name: 'cơm gà 20',
    price: 9999999,
  },
  {
    name: 'cơm gà 21',
    price: 9999999,
  },
  {
    name: 'cơm gà last',
    price: 9999999,
  },
]

const Gallery = () => {
  const [setOriginalFoodList, setActiveSlide, shownFoodList] = useFoodStore(
    useShallow((state) => [state.setOriginalFoodList, state.setActiveSlide, state.shownFoodList]),
  )

  useEffect(() => {
    setOriginalFoodList(dummyData)
    setActiveSlide(0)
  }, [setActiveSlide, setOriginalFoodList])

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-fit p-4 mx-auto">
      {shownFoodList.map((item) => (
        <li key={item.name}>
          <ShowcaseCard name={item.name} price={item.price} />
        </li>
      ))}
    </ul>
  )
}

export default Gallery
