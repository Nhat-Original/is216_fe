'use client'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import useFoodDetailStore from '../stores/useFoodDetailStore'
import { useShallow } from 'zustand/react/shallow'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/api'
import { useSessionStore } from '@/stores/useSessionStore'
import { queryClient } from '@/components/Providers/QueryProvider'
import { toast } from 'react-toastify'

const FoodDetail = () => {
  const user = useSessionStore((state) => state.user)

  const [
    isLoading,
    menuItem,
    eatery,
    menuItemOptions,
    currentMenuItemOption,
    averageRating,
    numberOfReviews,
    setCurrentMenuItemOption,
  ] = useFoodDetailStore(
    useShallow((state) => [
      state.isLoading,
      state.menuItem,
      state.eatery,
      state.menuItemOptions,
      state.currentMenuItemOption,
      state.averageRating,
      state.numberOfReviews,
      state.setCurrentMenuItemOption,
    ]),
  )

  const { mutate } = useMutation({
    mutationFn: async ({
      userId,
      menuItemOptionId,
      quantity,
    }: {
      userId: string
      menuItemOptionId: string
      quantity: number
    }) => {
      return await api.post('/cart', {
        userId,
        menuItemOptionId,
        quantity,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Đã thêm vào giỏ hàng')
    },
    onError: (err: any) => {
      toast.error(err.response.data.message)
    },
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex flex-col items-center lg:items-start gap-10 lg:flex-row max-w-[1400px] mx-auto p-4 lg:gap-32">
      <div className="max-w-[475px] aspect-square">
        <img className="w-full h-full object-cover rounded-2xl" src={menuItem?.imageUrl} alt="food image" />
      </div>

      <div className="flex flex-col gap-4 grow">
        <h1 className="text-5xl font-bold">{menuItem?.name}</h1>
        <p className="text-2xl text-primary">{currentMenuItemOption?.price.toLocaleString() || '?'}đ</p>
        <div className="flex items-center gap-2">
          <div className="rating rating-md rating-half">
            {(() => {
              const list: ReactNode[] = []
              for (let i = 1; i <= 10; ++i) {
                list.push(
                  <input
                    key={`menu-item-${menuItem?.id}-average-rating-half-star-${i}`}
                    name={`menu-item-${menuItem?.id}-average-rating`}
                    type="radio"
                    className={`bg-primary mask mask-star-2 ${i % 2 === 0 ? 'mask-half-2' : 'mask-half-1'}`}
                    checked={averageRating * 2 === i}
                    readOnly={true}
                  />,
                )
              }
              return list
            })()}
          </div>
          <p>{numberOfReviews} đánh giá</p>
        </div>
        <Link href={`/shop/${eatery?.id}`}>
          <p className="underline">{eatery?.name}</p>
        </Link>
        <p>
          {`${eatery?.address?.province}, ${eatery?.address?.district}, ${eatery?.address?.ward}, ${eatery?.address?.detail}`}
        </p>
        <p>{menuItem?.description || <span className="text-gray">Không có mô tả món ăn</span>}</p>
        <form
          className="form-control"
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target as HTMLFormElement)
            mutate({
              userId: user?.id,
              menuItemOptionId: formData.get('menuItemOptionId') as string,
              quantity: parseInt(formData.get('quantity') as string),
            })
          }}
        >
          <label className="w-20">
            <div className="label">
              <span className="label-text text-base w-full">Kích cỡ</span>
            </div>
            <select
              name="menuItemOptionId"
              className="select select-bordered"
              onChange={(e) => {
                const currentMenuItemOption = menuItemOptions.find((option) => option.id === e.target.value)
                if (currentMenuItemOption) {
                  setCurrentMenuItemOption(currentMenuItemOption)
                }
              }}
            >
              {menuItemOptions.length === 0 ? (
                <option className="disabled" value={''}>
                  ?
                </option>
              ) : (
                menuItemOptions?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.size}
                  </option>
                ))
              )}
            </select>
          </label>
          <label className=" w-20">
            <div className="label">
              <span className="label-text text-base">Số lượng</span>
            </div>
            <input
              name="quantity"
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
