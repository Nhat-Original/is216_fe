'use client'
import React from 'react'
import { api } from '@/api'
import MenuItem from './menuItem'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
interface Props {
  menu_id: string
}

const EateryContainer = ({ menu_id }: Props) => {
  const {
    data: data_menu,
    isSuccess,
    error,
    isError,
  } = useQuery({
    queryKey: ['menu', menu_id],
    queryFn: () => api.get(`/menu-item/menu/${menu_id}`),
  })
  if (isError) {
    toast.error(error.message)
  }
  if (isSuccess) {
    return (
      <div className="flex gap-2 flex-col mt-4">
        {data_menu.data.map((item: any) => (
          <MenuItem data={item} key={item.id} id={item.id} />
        ))}
      </div>
    )
  }

  return <div>Loading...</div>
}

export default EateryContainer
