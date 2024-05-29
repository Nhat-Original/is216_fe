'use client'
import React from 'react'
import { api } from '@/api'
import { useSessionStore } from '@/stores/useSessionStore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useUserAddressesStore from '../stores/useUserAddressesStore'
import { useShallow } from 'zustand/react/shallow'
import LoadingSpinner from '@/components/LoadingSpinner'
import deleteIcon from '@/public/images/deleteIcon.svg'
import Image from 'next/image'
import { toast } from 'react-toastify'

const Table = () => {
  const user = useSessionStore((state) => state.user)
  const [addresses, setAddresses] = useUserAddressesStore(useShallow((state) => [state.addresses, state.setAddresses]))

  const queryClient = useQueryClient()

  const { isLoading } = useQuery({
    queryKey: ['user-address', user.id],
    queryFn: async () => {
      const response = await api.get(`/address/user/${user.id}`)
      setAddresses(response.data)
      return response.data
    },
    enabled: !!user.id,
  })

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/address/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-address'],
      })
      toast.success('Đã xóa địa chỉ')
    },
    onError: (err: any) => {
      toast.error(err.response.data.message)
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="overflow-x-auto overflow-y-scroll h-fit max-w-full">
      <table className="table table-zebra min-w-max">
        <thead className="bg-secondary">
          <tr>
            <th></th>
            <th>Tỉnh</th>
            <th>Huyện</th>
            <th>Xã</th>
            <th>Địa chỉ chi tiết</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(addresses) &&
            addresses.length > 0 &&
            addresses.map((address, index) => (
              <tr key={address.id}>
                <td>{index + 1}</td>
                <td>{address.province}</td>
                <td>{address.district}</td>
                <td>{address.ward}</td>
                <td>{address.detail}</td>
                <td>
                  <button className="btn btn-sm btn-ghost" onClick={() => mutate(address.id)}>
                    <Image src={deleteIcon} alt="delete icon" />
                  </button>
                </td>
              </tr>
            ))}
          {addresses.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
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
