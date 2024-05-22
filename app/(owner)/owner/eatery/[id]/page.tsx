'use client'
import { EateryStore } from '../../store/ownerStore'
import { useStore } from 'zustand'
import Form from '@/app/(owner)/components/formCreate'
import EateryContainer from '@/app/(owner)/components/eateryContainer'
import { useRef } from 'react'
const EateryManagerPage = () => {
  const eateryStore = useStore(EateryStore)
  const formRef = useRef<any>(null)

  const handleClearForm = () => {
    if (formRef.current) {
      formRef.current.clearForm()
    }
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
        <EateryContainer menu_id={eateryStore.menu_id} />
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
