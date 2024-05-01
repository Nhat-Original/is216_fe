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
      rating: 4.5,
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

const LatestReviews = () => {
  const latestReviews = dummyData.reviews.slice(0, 2)

  return (
    <div className=" flex flex-col gap-4 w-fit mx-auto ">
      <p className="text-lg font-bold">Đánh giá mới nhất</p>
      <ul className="flex flex-col gap-4 lg:flex-row lg:justify-between w-fit">
        {latestReviews.map((review) => (
          <li key={review.id} className="flex flex-col border min-w-[300px] w-[450px] rounded-2xl p-4">
            <div className="rating rating-md rating-half">
              {(() => {
                const list: ReactNode[] = []
                for (let i = 1; i <= 10; ++i) {
                  list.push(
                    <input
                      key={`review-${review.id}-rating-half-star-${i}`}
                      type="radio"
                      className={`bg-primary mask mask-star-2 mask-half-${i % 2 === 0 ? '2' : '1'}`}
                      checked={review.rating * 2 === i}
                      readOnly={true}
                    />,
                  )
                }
                return list
              })()}
            </div>
            <h1 className="font-bold">{review.user.fullName}</h1>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LatestReviews
