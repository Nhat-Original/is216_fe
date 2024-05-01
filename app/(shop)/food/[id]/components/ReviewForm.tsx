import React from 'react'

const ReviewForm = () => {
  return (
    <form className="form-control gap-4 p-4 max-w-[1050px] mx-auto">
      <h1 className="font-bold text-lg">Đánh giá của bạn</h1>
      <div className="rating rating-md rating-half">
        <input type="radio" name="rating-10" className="bg-primary mask mask-star-2 mask-half-1" />
        <input type="radio" name="rating-10" className="bg-primary mask mask-star-2 mask-half-2" />
        <input type="radio" name="rating-10" className="bg-primary mask mask-star-2 mask-half-1" />
        <input type="radio" name="rating-10" className="bg-primary mask mask-star-2 mask-half-2" />
        <input type="radio" name="rating-10" className="bg-primary mask mask-star-2 mask-half-1" />
        <input type="radio" name="rating-10" className="bg-primary mask mask-star-2 mask-half-2" />
        <input type="radio" name="rating-10" className="bg-primary mask mask-star-2 mask-half-1" />
        <input type="radio" name="rating-10" className="bg-primary mask mask-star-2 mask-half-2" />
        <input type="radio" name="rating-10" className="bg-primary mask mask-star-2 mask-half-1" />
        <input type="radio" name="rating-10" className="bg-primary mask mask-star-2 mask-half-2" />
      </div>
      <textarea className="resize-none textarea textarea-bordered" placeholder="Bình luận"></textarea>
      <button className="btn w-[200px] bg-primary mt-4">Thêm đánh giá</button>
    </form>
  )
}

export default ReviewForm
