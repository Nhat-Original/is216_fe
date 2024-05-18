'use client'
import React from 'react'

const PaymentPanel = () => {
  return (
    <div className="flex flex-col gap-4 bg-secondary min-w-max h-fit p-8">
      <h1 className="text-2xl font-bold text-center text-primary">Bảng thanh toán</h1>
      <p>Tổng tiền: {}</p>
      <button className="btn btn-outline btn-md">Thanh toán ngay</button>
    </div>
  )
}

export default PaymentPanel
