'use client'
import { api } from '@/api'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useSessionStore } from '@/stores/useSessionStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import Image from 'next/image'
import deleteIcon from '@/public/images/deleteIcon.svg'
import useCartStore, { CartItem } from '../stores/useCartStore'
import { useShallow } from 'zustand/react/shallow'
import { toast } from 'react-toastify'

const Table = () => {
  const user = useSessionStore((state) => state.user)
  const [cartItems, setCartItems, selectedCartItems, setSelectedCartItems] = useCartStore(
    useShallow((state) => [state.cartItems, state.setCartItems, state.selectedCartItems, state.setSelectedCartItems]),
  )

  const queryClient = useQueryClient()

  const { isLoading } = useQuery({
    queryKey: ['cart', user.id],
    queryFn: async () => {
      const res = await api.get(`/cart/user/${user.id}`)
      setCartItems(res.data)
      return res.data as CartItem[]
    },
    enabled: !!user.id,
  })

  const { mutate: deleteCartItem } = useMutation({
    mutationFn: async ({ userId, menuItemOptionId }: { userId: string; menuItemOptionId: string }) => {
      await api.delete(`/cart/${userId}/${menuItemOptionId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
    },
    onError: (err: any) => {
      toast.error(err.response.data.message)
    },
  })

  const { mutate: updateCartItem } = useMutation({
    mutationFn: async ({
      userId,
      menuItemOptionId,
      quantity,
    }: {
      userId: string
      menuItemOptionId: string
      quantity: number
    }) => {
      await api.patch(`/cart/${userId}/${menuItemOptionId}`, { quantity })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
    },
    onError: (err: any) => {
      toast.error(err.response.data.message)
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="overflow-x-auto overflow-y-scroll max-w-max h-fit max-h-[calc(100vh-150px)]">
      <table className="table table-zebra min-w-max">
        <thead className="bg-secondary">
          <tr>
            <th>
              <input
                type="checkbox"
                checked={cartItems.length !== 0 && selectedCartItems.length === cartItems.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCartItems(cartItems)
                  } else {
                    setSelectedCartItems([])
                  }
                }}
              />
            </th>
            <th></th>
            <th>Tên món ăn</th>
            <th>Tên cửa hàng</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cartItems) &&
            cartItems.length > 0 &&
            cartItems?.map((item) => (
              <tr key={item.menuItemOptionId}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCartItems.some(
                      (selectedItem) => selectedItem.menuItemOptionId === item.menuItemOptionId,
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCartItems([...selectedCartItems, item])
                      } else {
                        setSelectedCartItems(
                          selectedCartItems.filter(
                            (selectedItem) => selectedItem.menuItemOptionId !== item.menuItemOptionId,
                          ),
                        )
                      }
                    }}
                  />
                </td>
                <td>
                  <img src={item.imageUrl} alt={item.name} className="w-10 aspect-square object-cover rounded" />
                </td>
                <td>
                  {item.name} ({item.size})
                </td>
                <td>{item.eatery.name}</td>
                <td>{item.price.toLocaleString()}đ</td>
                <td>
                  <input
                    name="quantity"
                    className="input input-bordered input-sm w-16"
                    type="number"
                    min="1"
                    max="10"
                    defaultValue={item.quantity}
                    onKeyDown={(event) => {
                      event.preventDefault()
                    }}
                    onChange={(e) =>
                      updateCartItem({
                        userId: user.id,
                        menuItemOptionId: item.menuItemOptionId,
                        quantity: Number(e.target.value),
                      })
                    }
                  />
                </td>
                <td>{(item.price * item.quantity).toLocaleString()}đ</td>
                <td>
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => deleteCartItem({ userId: user.id, menuItemOptionId: item.menuItemOptionId })}
                  >
                    <Image src={deleteIcon} alt="delete icon" />
                  </button>
                </td>
              </tr>
            ))}
          {cartItems.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center">
                Giỏ hàng trống
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
