'use client'
import Image from 'next/image'
import React from 'react'
import cartIcon from './images/cartIcon.svg'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api'
import { useSessionStore } from '@/stores/useSessionStore'
import Link from 'next/link'

const Cart = () => {
  const user = useSessionStore((state) => state.user)

  const { data: cartItems } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await api.get(`/cart/user/${user.id}`)
      return res.data
    },
    enabled: !!user.id,
  })

  const cartItemCount = cartItems?.length || 0

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <Image src={cartIcon} alt="cart icon" />
          <span className="badge badge-sm indicator-item">{cartItemCount}</span>
        </div>
      </div>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body flex flex-col items-center">
          <span className="font-bold text-lg">{cartItemCount} đơn hàng</span>
          <div className="card-actions">
            <Link href="/cart">
              <button className="btn bg-primary btn-block">Xem chi tiết</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
