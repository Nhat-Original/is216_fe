'use client'
import { useRef } from 'react'
import Form from './formEdit'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/api'
import { queryClient } from '@/components/Providers/QueryProvider'
type MenuItemOptionProps = {
  id: string
  price: number
  size: string
}

export type MenuItemProps = {
  id: string
  name: string
  description: string
  imageUrl: string
  menuItemOptions: MenuItemOptionProps[]
}
import { toast } from 'react-toastify'
const MenuItem = ({ data, id }: { data: MenuItemProps; id: string }) => {
  const formRef = useRef<any>(null)
  const mutation = useMutation({
    onSuccess: () => {
      toast.success('Xóa thành công')
      queryClient.invalidateQueries({ queryKey: ['menu'] })
    },
    onError: () => {
      toast.error('Xóa thất bại')
    },
    mutationFn: () => api.delete(`/menu-item/${id}`),
  })
  const handleClearForm = () => {
    if (formRef.current) {
      formRef.current.clearForm()
    }
  }
  const handleDelete = () => {
    mutation.mutate()
  }
  return (
    <>
      <div className="flex justify-between bg-slate-100 hover:bg-slate-300 cursor-pointer items-center p-4">
        <div className="avatar">
          <div className="w-24 rounded">
            <img
              src={data.imageUrl}
              alt={data.name}
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/150'
              }}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h2>Tên sản phẩm:</h2>
          <h2> {data.name}</h2>
        </div>
        <div className="flex flex-col">
          <h2>Mô tả: </h2>
          <p>{data.description}</p>
        </div>
        <div className="flex flex-col">
          <h2>Giá và size từng loại</h2>
          <ul>
            {data.menuItemOptions.map((option) => (
              <li key={option.id}>
                {option.size} - {option.price} VND
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button
            className="btn btn-warning"
            onClick={() => (document.getElementById(`edit_modal_${id}`) as HTMLDialogElement).showModal()}
          >
            Edit
          </button>
          <button className="btn btn-error" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <dialog id={`edit_modal_${id}`} className="modal">
        <div className="modal-box max-w-3xl">
          <Form data={data} id={id} ref={formRef} />
          <div className="modal-action">
            <form method="dialog" className=" flex gap-7">
              <button className="btn btn-warning" onClick={handleClearForm}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
export default MenuItem
