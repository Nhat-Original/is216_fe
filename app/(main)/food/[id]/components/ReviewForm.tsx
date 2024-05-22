'use client'
import { queryClient } from '@/components/Providers/QueryProvider'
import { useSessionStore } from '@/stores/useSessionStore'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import useFoodDetailStore from '../stores/useFoodDetailStore'
import { api } from '@/api'
import { useShallow } from 'zustand/react/shallow'
import { toast } from 'react-toastify'

const ReviewForm = () => {
  const user = useSessionStore((state) => state.user)

  const [menuItem, reviews] = useFoodDetailStore(useShallow((state) => [state.menuItem, state.reviews]))

  const alreadyReviewed = reviews.some((review) => review.user.id === user.id)

  const { mutate } = useMutation({
    mutationFn: async ({
      rating,
      comment,
      userId,
      menuItemId,
    }: {
      rating: number
      comment: string
      userId: string
      menuItemId: string
    }) => {
      await api.post('/review', {
        rating,
        comment,
        userId,
        menuItemId,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-item-detail'] })
      toast.success('Đã thêm đánh giá')
    },
    onError: (err: any) => {
      toast.error(err.response.data.message)
    },
  })

  return (
    <form
      className="form-control gap-4 p-4 max-w-[1050px] mx-auto"
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const rating = Number(formData.get('rating'))
        const comment = String(formData.get('comment'))
        mutate({
          rating,
          comment,
          userId: user.id,
          menuItemId: menuItem?.id || '',
        })
      }}
    >
      <h1 className="font-bold text-lg">Đánh giá của bạn</h1>
      <div className="rating rating-md">
        <input name="rating" value={1} type="radio" className="mask mask-star-2 bg-primary" />
        <input name="rating" value={2} type="radio" className="mask mask-star-2 bg-primary" />
        <input name="rating" value={3} type="radio" className="mask mask-star-2 bg-primary" />
        <input name="rating" value={4} type="radio" className="mask mask-star-2 bg-primary" />
        <input name="rating" value={5} type="radio" className="mask mask-star-2 bg-primary" defaultChecked />
      </div>
      <textarea
        name="comment"
        required
        className="resize-none textarea textarea-bordered"
        placeholder="Bình luận"
      ></textarea>
      <button type="submit" className="btn w-[200px] bg-primary mt-4" disabled={alreadyReviewed}>
        {alreadyReviewed ? 'Bạn đã đánh giá' : 'Thêm đánh giá'}
      </button>
    </form>
  )
}

export default ReviewForm
