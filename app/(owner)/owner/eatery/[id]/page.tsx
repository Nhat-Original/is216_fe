'use client'

import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import MenuItem from '@/app/(owner)/components/menuItem'
import Form from '@/app/(owner)/components/formCreate'
const EateryManagerPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data } = useQuery({
    queryKey: ['eatery'],
    queryFn: () => api.get(`/eatery/${id}`),
  })
  const { data: data_menu } = useQuery({
    queryKey: ['menu'],
    queryFn: () => api.get(`/menu/1a4818a9-eb4b-4e97-8e69-70eae435e2cc`),
  })
  console.log(data_menu, 'menu')
  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1>{data?.data.name}</h1>
          <div>
            <button
              className="btn"
              onClick={() => (document.getElementById('my_modal_5') as HTMLDialogElement).showModal()}
            >
              Thêm món ăn
            </button>
          </div>
        </div>
        <div>{data?.data.menu.menuItems.map((item: any) => <MenuItem data={item} key={item.id} />)}</div>
      </div>
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box max-w-3xl">
          <Form menu_id={data?.data.menu.id} />
          <div className="modal-action">
            <form method="dialog" className=" flex gap-7">
              <button className="btn btn-warning">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
export default EateryManagerPage
