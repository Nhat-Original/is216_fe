'use client'
import Link from 'next/link'
import React, { ReactNode } from 'react'

const dummyData = {
  id: '1f3d3866-d7d0-4da7-a953-59712c14e6b1',
  name: 'food',
  description:
    'food description fsaghsakghkjsa ghsdkjhgkjshghkjsa  hjksdhgskagh sa gskajdghsakjg        fhskjdhgkjsahgkjsadh     gdhskjahgkjshglashg',
  imageUrl: 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg',
  menuItemOptions: [
    {
      id: '1f3d3866-d7d0-4da7-a953-59712c14e6b2',
      size: 'S',
      price: 1000,
    },
    {
      id: '1f3d3866-d7d0-4da7-a953-59712c14e6b3',
      size: 'M',
      price: 2000,
    },
    {
      id: '1f3d3866-d7d0-4da7-a953-59712c14e6b4',
      size: 'L',
      price: 3000,
    },
  ],
  reviews: [
    {
      id: '1f3d3866-d7d0-4da7-a953-59712c14e6b5',
      rating: 5,
      comment: 'good food',
      user: {
        id: '1f3d3866-d7d0-4da7-a953-59712c14e6b6',
        fullName: 'John Doe',
      },
    },
    {
      id: '1f3d3866-d7d0-4da7-a953-59712c14e6b7',
      rating: 4,
      comment: 'great',
      user: {
        id: '1f3d3866-d7d0-4da7-a953-59712c14e6b8',
        fullName: 'Jane Doe',
      },
    },
  ],
  eatery: {
    id: '1',
    name: 'eatery name',
  },
}

const FoodDetail = () => {
  return (
    <div className="flex flex-col items-center lg:items-start gap-10 lg:flex-row max-w-[1400px] mx-auto p-4 lg:gap-32">
      <div className="max-w-[475px] aspect-square">
        <img className="w-full h-full object-cover rounded-2xl" src={dummyData.imageUrl} alt="food image" />
      </div>

      <div className="flex flex-col gap-4 grow">
        <h1 className="text-5xl font-bold">{dummyData.name}</h1>
        <p className="text-2xl text-primary">100000 VND</p>
        <div className="flex items-center gap-2">
          <div className="rating rating-md rating-half">
            {(() => {
              const list: ReactNode[] = []
              for (let i = 1; i <= 10; ++i) {
                list.push(
                  <input
                    key={`food-${dummyData.id}average-rating-half-star-${i}`}
                    type="radio"
                    className={`bg-primary mask mask-star-2 mask-half-${i % 2 === 0 ? '2' : '1'}`}
                    checked={3.5 * 2 === i}
                    readOnly={true}
                  />,
                )
              }
              return list
            })()}
          </div>
          <p>5 đánh giá</p>
        </div>
        <Link href={`/shop/${dummyData.eatery.id}`}>
          <p className="underline">{dummyData.eatery.name}</p>
        </Link>
        <p>{dummyData.description}</p>
        <form className="form-control">
          <label className=" w-20">
            <div className="label">
              <span className="label-text text-base w-full">Kích cỡ</span>
            </div>
            <select className="select select-bordered">
              <option>S</option>
              <option>M</option>
              <option>L</option>
            </select>
          </label>
          <label className=" w-20">
            <div className="label">
              <span className="label-text text-base">Số lượng</span>
            </div>
            <input
              className="input input-bordered w-full"
              type="number"
              min="1"
              max="10"
              defaultValue={1}
              onKeyDown={(event) => {
                event.preventDefault()
              }}
            />
          </label>
          <button className="btn w-[200px] bg-primary mt-4" type="submit">
            Thêm vào giỏ hàng
          </button>
        </form>
      </div>
    </div>
  )
}

export default FoodDetail
