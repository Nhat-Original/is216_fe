'use client'
import React from 'react'
import useCartStore from '../stores/useCartStore'
import { useShallow } from 'zustand/react/shallow'

const PaymentPanel = () => {
  const [selectedCartItems] = useCartStore(useShallow((state) => [state.selectedCartItems]))

  const convertSelectedCartItemsToStatus = (): { message: string; isValid: boolean } => {
    if (selectedCartItems.length === 0) return { message: 'Chưa có tùy chọn món ăn để thanh toán', isValid: false }

    if (selectedCartItems.some((item) => item.eatery.id !== selectedCartItems[0].eatery.id))
      return {
        message: 'Không thể thanh toán do các tùy chọn món ăn chỉ được từ một cửa hàng duy nhất',
        isValid: false,
      }

    return { message: 'Có thể thanh toán', isValid: true }
  }

  return (
    <div className="card w-80 flex flex-col gap-4 bg-secondary h-fit p-8">
      <h1 className="text-2xl font-bold text-center text-primary">Bảng thanh toán</h1>
      <p>
        <span className="font-bold">Tổng tiền:</span>{' '}
        {selectedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}đ
      </p>
      <p>
        <span className="font-bold">Trạng thái:</span> {convertSelectedCartItemsToStatus().message}
      </p>
      <button
        className="btn btn-outline btn-md"
        onClick={() => {
          ;(document.getElementById('create_payment_modal') as HTMLDialogElement)?.showModal()
        }}
        disabled={!convertSelectedCartItemsToStatus().isValid}
      >
        Thanh toán ngay
      </button>
    </div>
  )
}

export default PaymentPanel
