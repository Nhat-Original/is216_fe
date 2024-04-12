import React from 'react'
import ShowcaseCard from './components/ShowcaseCard'
import FunctionBar from './components/FunctionBar'
import RouteBreadcrumb from '@/components/routeBreadcrumb'

const dummyData = [
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
  {
    name: 'cơm gà',
    price: 9999999,
  },
]

const FoodPage = () => {
  return (
    <div>
      <RouteBreadcrumb route={'/food'} />
      <FunctionBar />

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-fit p-4 mx-auto">
        {dummyData.map((item, index) => (
          <li key={index}>
            <ShowcaseCard name={item.name} price={item.price} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FoodPage
