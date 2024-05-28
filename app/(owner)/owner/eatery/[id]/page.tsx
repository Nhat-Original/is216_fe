'use client'
import { EateryStore } from '../../store/ownerStore'
import { useStore } from 'zustand'
import Form from '@/app/(owner)/components/formCreate'
import EateryContainer from '@/app/(owner)/components/eateryContainer'
import { useRef, useState } from 'react'
import { api } from '@/api'
import { useDebouncedCallback } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '@/components/LoadingSpinner'
import { toast } from 'react-toastify'
const EateryManagerPage = () => {
  const eateryStore = useStore(EateryStore)
  const formRef = useRef<any>(null)
  const [query, setQuery] = useState('')
  const handleClearForm = () => {
    if (formRef.current) {
      formRef.current.clearForm()
    }
  }
  const { data, isSuccess, error, isError, isLoading } = useQuery({
    queryKey: ['menu', eateryStore.menu_id, query],
    queryFn: () => api.get(`/menu-item/menu/${eateryStore.menu_id}?name=${query}`),
  })
  const debounce = useDebouncedCallback((value: string) => {
    setQuery(value), 1000
  })
  if (isError) {
    toast.error(error.message)
  }
  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1>{eateryStore.name}</h1>
          <div>
            <button
              className="btn"
              onClick={() => (document.getElementById('create_modal') as HTMLDialogElement).showModal()}
            >
              Thêm món ăn
            </button>
          </div>
        </div>
        <label className="input input-sm input-bordered flex items-center gap-2 w-1/3 mt-2">
          <input
            type="text"
            className="grow"
            placeholder="Tìm sản phẩm"
            value={query}
            onChange={(e) => debounce(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        {isLoading && <LoadingSpinner />}
        {isSuccess && <EateryContainer data={data?.data} />}
      </div>
      <dialog id="create_modal" className="modal">
        <div className="modal-box max-w-3xl">
          <Form menu_id={eateryStore.menu_id} ref={formRef} />
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
export default EateryManagerPage
