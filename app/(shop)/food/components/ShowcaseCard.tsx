import React from 'react'
import foodShowcasePlaceholder from '@/public/images/foodShowcasePlaceholder.png'

const ShowcaseCard = ({ name, price }: { name: string; price: number }) => {
  return (
    <div className="flex flex-col w-[285px] h-[446px] bg-[#F4F5F7]">
      <img src={foodShowcasePlaceholder.src} alt="showcase image" className="w-full h-[300px]" />
      <div className="flex flex-col gap-4 justify-center h-full px-4">
        <h1 className="text-lg font-bold">{name}</h1>
        <p>{price} VND</p>
      </div>
    </div>
  )
}

export default ShowcaseCard
