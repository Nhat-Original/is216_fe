'use client'
import React from 'react'
import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import useOrderHistoryStore, { DeliveryStatus, PaymentMethod } from '../stores/useOrderHistoryStore'
import { useShallow } from 'zustand/react/shallow'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useSessionStore } from '@/stores/useSessionStore'

const Table = () => {
  const user = useSessionStore((state) => state.user)
  const [orders, setOrders] = useOrderHistoryStore(useShallow((state) => [state.orders, state.setOrders]))

  const { isLoading } = useQuery({
    queryKey: ['order-history'],
    queryFn: async () => {
      const response = await api.get(`/order/user/${user.id}`)
      setOrders(response.data)
      return response.data
    },
  })

  const convertPaymentMethodToString = (paymentMethod: PaymentMethod): string => {
    switch (paymentMethod) {
      case PaymentMethod.CASH:
        return 'Tiền mặt'
      case PaymentMethod.CREDIT_CARD:
        return 'Thẻ tín dụng'
      default:
        return ''
    }
  }

  const convertDeliveryStatusToString = (deliveryStatus: DeliveryStatus): string => {
    switch (deliveryStatus) {
      case DeliveryStatus.PENDING:
        return 'Đang chờ'
      case DeliveryStatus.SUCCESS:
        return 'Thành công'
      case DeliveryStatus.FAILED:
        return 'Thất bại'
      default:
        return ''
    }
  }

  const formatDateString = (date: string): string => {
    const dateObject = new Date(date)
    return `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="mx-4 mt-4 sm:mx-10 overflow-x-auto overflow-y-scroll h-[calc(100vh-150px)]">
      <table className="table table-zebra">
        <thead className="bg-secondary">
          <tr>
            <th></th>
            <th>Mã đơn hàng</th>
            <th>Ngày đặt</th>
            <th>Tên của hàng</th>
            <th>Tổng giá trị</th>
            <th>Phương thức thanh toán</th>
            <th>Trạng thái giao hàng</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) &&
            orders.length > 0 &&
            orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.id}</td>
                <td>{formatDateString(order.orderDate)}</td>
                <td>{order.eatery.name}</td>
                <td>{order.totalPrice}</td>
                <td>{convertPaymentMethodToString(order.paymentMethod)}</td>
                <td>{convertDeliveryStatusToString(order.deliveryStatus)}</td>
              </tr>
            ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table