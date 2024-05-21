'use client'
import { api } from '@/api'
import { useSessionStore } from '@/stores/useSessionStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import useCartStore from '../stores/useCartStore'
import { useShallow } from 'zustand/react/shallow'
import { queryClient } from '@/components/Providers/QueryProvider'
import { toast } from 'react-toastify'

const PaymentModal = () => {
  const [selectedCartItems, setSelectedCartItems, errorMessages, setErrorMessages] = useCartStore(
    useShallow((state) => [
      state.selectedCartItems,
      state.setSelectedCartItems,
      state.errorMessages,
      state.setErrorMessages,
    ]),
  )

  const user = useSessionStore((state) => state.user)

  const { data: addresses } = useQuery({
    queryKey: ['user-address', user.id],
    queryFn: async () => {
      const response = await api.get(`/address/user/${user.id}`)
      return response.data
    },
    enabled: !!user.id,
  })

  const { mutate: removeSelectedCartItems } = useMutation({
    mutationFn: async () => {
      await Promise.all(
        selectedCartItems.map((selectedCartItem) =>
          api.delete(`/cart/${user.id}/${selectedCartItem.menuItemOptionId}`),
        ),
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
      setSelectedCartItems([])
    },
    onError: (err: any) => {
      toast.error(err.response.data.message)
    },
  })

  const { mutate: addOrder } = useMutation({
    mutationFn: async (body: any) => {
      await api.post('/order', body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-order'],
      })
      toast.success('Đã đặt hàng')
    },
    onError: (err: any) => {
      toast.error(err.response.data.message)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const body = Object.fromEntries(formData.entries())

    // Only need to check for address id
    if (body.addressId === '') {
      setErrorMessages({ addressId: ['Địa chỉ giao hàng không được để trống'] })
      return
    } else {
      setErrorMessages({})
    }

    addOrder({
      ...body,
      userId: user.id,
      eateryId: selectedCartItems[0]?.eatery?.id,
      totalPrice: selectedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      orderDate: new Date().toISOString().split('T')[0],
      orderDetails: selectedCartItems.map((selectedCartItem) => ({
        menuItemOptionId: selectedCartItem.menuItemOptionId,
        quantity: selectedCartItem.quantity,
      })),
    })
    removeSelectedCartItems()
    ;(document.getElementById('create_payment_modal') as HTMLDialogElement)?.close()
  }

  return (
    <dialog id="create_payment_modal" className="modal">
      <div className="modal-box max-w-3xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h1 className="font-bold text-lg mb-4 text-primary">Thanh toán</h1>

        <form className="flex flex-col md:flex-row gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-lg mb-4">Thông tin khách hàng</h1>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Địa chỉ giao hàng</span>
              </div>
              <select name="addressId" className="select select-bordered" defaultValue="">
                <option value="">Chọn địa chỉ</option>
                {addresses?.map((address: any) => (
                  <option key={address.id} value={address.id}>
                    {address.province}, {address.district}, {address.ward}, {address.detail}
                  </option>
                ))}
              </select>
              <div className="text-sm text-red-500 ">
                {errorMessages?.addressId?.map((message, index) => <p key={index}>{message}</p>)}
              </div>
            </label>

            <label className="form-control w-full max-w-sx">
              <div className="label">
                <span className="label-text">Thông tin thêm</span>
              </div>
              <textarea name="note" className="textarea textarea-md textarea-bordered"></textarea>
            </label>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-lg mb-4">Thông tin đơn hàng</h1>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Tên cửa hàng</span>
              </div>
              <input
                type="text"
                value={selectedCartItems[0]?.eatery?.name}
                readOnly
                className="input input-bordered bg-gray"
              />
            </label>

            <div className="w-full overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tên món ăn</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCartItems.map((selectedCartItem) => (
                    <tr key={selectedCartItem.menuItemOptionId}>
                      <td>
                        {selectedCartItem.name} ({selectedCartItem.size})
                      </td>
                      <td>{selectedCartItem.price.toLocaleString()}</td>
                      <td>{selectedCartItem.quantity}</td>
                      <td>{(selectedCartItem.price * selectedCartItem.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="font-bold text-primary">
              {selectedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}đ
            </div>

            <label className="w-full max-w-xs flex items-center gap-2">
              <input type="radio" name="paymentMethod" className="radio " defaultChecked value="CREDIT_CARD" />
              <span>Thanh toán bằng thẻ tín dụng</span>
            </label>

            <label className="w-full max-w-xs flex items-center gap-2">
              <input type="radio" name="paymentMethod" className="radio " value="CASH" />
              <span>Thanh toán bằng tiền mặt</span>
            </label>

            <button className="btn btn-lg w-fit bg-primary" type="submit">
              Mua hàng
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

export default PaymentModal
