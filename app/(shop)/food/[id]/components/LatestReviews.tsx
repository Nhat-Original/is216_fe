'use client'
import React, { ReactNode } from 'react'
import useFoodDetailStore from '../stores/useFoodDetailStore'
import { useShallow } from 'zustand/react/shallow'
import LoadingSpinner from '@/components/LoadingSpinner'

const LatestReviews = () => {
  const [isLoading, reviews] = useFoodDetailStore(useShallow((state) => [state.isLoading, state.reviews]))
  const latestReviews = reviews.slice(-2)

  if (isLoading) return <LoadingSpinner />

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
