import Link from 'next/link'
import React from 'react'

const ShowcaseCard = ({ id, name, imageUrl }: { id: string; name: string; imageUrl: string }) => {
  return (
    <Link href={`/food/${id}`}>
      <div className="flex flex-col w-[285px] h-[446px] bg-[#F4F5F7]">
        <div className="h-[300px] w-full">
          <img src={imageUrl} alt="showcase image" className="object-cover h-full w-full" />
        </div>
        <div className="flex flex-col gap-4 justify-center grow px-4">
          <h1 className="text-lg font-bold">{name}</h1>
        </div>
      </div>
    </Link>
  )
}

export default ShowcaseCard
