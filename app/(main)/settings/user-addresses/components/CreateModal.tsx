'use client'
import React, { FormEvent } from 'react'
import useUserAdressesStore from '../stores/useUserAddressesStore'
import { useShallow } from 'zustand/react/shallow'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { api, locationApi } from '@/api'
import { z } from 'zod'
import { useSessionStore } from '@/stores/useSessionStore'

const CreateAddressSchema = z.object({
  province: z.string().min(1, { message: 'Tỉnh không được để trống' }),
  district: z.string().min(1, { message: 'Huyện không được để trống' }),
  ward: z.string().min(1, { message: 'Xã không được để trống' }),
  detail: z.string().min(1, { message: 'Chi tiết không được để trống' }),
})

const CreateModal = () => {
  const [
    fetchedProvinces,
    fetchedDistricts,
    fetchedWards,
    setFetchedProvinces,
    setFetchedDistricts,
    setFetchedWards,
    currentProvinceId,
    currentDistrictId,
    setCurrentProvinceId,
    setCurrentDistrictId,
    errorMessages,
    setErrorMessages,
  ] = useUserAdressesStore(
    useShallow((state) => [
      state.fetchedProvinces,
      state.fetchedDistricts,
      state.fetchedWards,
      state.setFetchedProvinces,
      state.setFetchedDistricts,
      state.setFetchedWards,
      state.currentProvinceId,
      state.currentDistrictId,
      state.setCurrentProvinceId,
      state.setCurrentDistrictId,
      state.errorMessages,
      state.setErrorMessages,
    ]),
  )

  const user = useSessionStore((state) => state.user)

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: async (body: any) => {
      await api.post('/address', body)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-address'],
      })
    },
  })

  useQuery({
    queryKey: ['provinces'],
    queryFn: async () => {
      const response = await locationApi.get('/province')
      setFetchedProvinces(response.data.results)
      return response.data.results
    },
  })

  useQuery({
    queryKey: ['districts', currentProvinceId],
    queryFn: async () => {
      if (!currentProvinceId) return []
      const response = await locationApi.get(`/province/district/${currentProvinceId}`)
      setFetchedDistricts(response.data.results)
      return response.data.results
    },
    enabled: !!currentProvinceId,
  })

  useQuery({
    queryKey: ['wards', currentDistrictId],
    queryFn: async () => {
      if (!currentDistrictId) return []
      const response = await locationApi.get(`/province/ward/${currentDistrictId}`)
      setFetchedWards(response.data.results)
      return response.data.results
    },
    enabled: !!currentDistrictId,
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries())
    const { success, error } = CreateAddressSchema.safeParse(formData)

    console.log(success)
    console.log(error?.flatten().fieldErrors)

    if (!success) {
      setErrorMessages(error.flatten().fieldErrors)
      return
    }

    e.currentTarget.reset()
    setErrorMessages({})
    ;(document.getElementById('create_address_modal') as HTMLFormElement).close()

    mutate({
      userId: user.id,
      ...formData,
    })
  }

  return (
    <>
      <button
        className="btn btn-md w-fit bg-primary"
        onClick={() => (document.getElementById('create_address_modal') as HTMLDialogElement).showModal()}
      >
        Thêm địa chỉ
      </button>
      <dialog id="create_address_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h1 className="font-bold text-lg mb-4">Thêm địa chỉ</h1>

          <form className="flex flex-col items-center gap-4 w-full" onSubmit={handleSubmit}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Tỉnh</span>
              </div>
              <select
                name="province"
                className="select select-bordered"
                defaultValue=""
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const selectedProvince = e.target.options[e.target.selectedIndex]
                  setCurrentProvinceId(selectedProvince.dataset.id!)
                  setCurrentDistrictId('')
                  setFetchedDistricts([])
                  setFetchedWards([])
                  queryClient.invalidateQueries({ queryKey: ['districts', 'wards'] })
                }}
              >
                <option value="">Chọn tỉnh</option>
                {fetchedProvinces.length > 0 &&
                  fetchedProvinces.map((province) => (
                    <option key={province.province_id} data-id={province.province_id} value={province.province_name}>
                      {province.province_name}
                    </option>
                  ))}
              </select>
              <div className="text-sm text-red-500 ">
                {errorMessages?.province?.map((message, index) => <p key={index}>{message}</p>)}
              </div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Huyện</span>
              </div>
              <select
                name="district"
                className="select select-bordered"
                defaultValue=""
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const selectedDistrict = e.target.options[e.target.selectedIndex]
                  setCurrentDistrictId(selectedDistrict.dataset.id!)
                  setFetchedWards([])
                  queryClient.invalidateQueries({ queryKey: ['wards'] })
                }}
              >
                <option value="">Chọn huyện</option>
                {fetchedDistricts.length > 0 &&
                  fetchedDistricts.map((district) => (
                    <option key={district.district_id} data-id={district.district_id} value={district.district_name}>
                      {district.district_name}
                    </option>
                  ))}
              </select>
              <div className="text-sm text-red-500 ">
                {errorMessages?.district?.map((message, index) => <p key={index}>{message}</p>)}
              </div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Xã</span>
              </div>
              <select name="ward" className="select select-bordered" defaultValue="">
                <option value="">Chọn xã</option>
                {fetchedWards.length > 0 &&
                  fetchedWards.map((ward) => (
                    <option key={ward.ward_id} value={ward.ward_name}>
                      {ward.ward_name}
                    </option>
                  ))}
              </select>
              <div className="text-sm text-red-500 ">
                {errorMessages?.ward?.map((message, index) => <p key={index}>{message}</p>)}
              </div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Chi tiết</span>
              </div>
              <textarea name="detail" className="textarea textarea-bordered"></textarea>
              <div className="text-sm text-red-500 ">
                {errorMessages?.detail?.map((message, index) => <p key={index}>{message}</p>)}
              </div>
            </label>

            <button className="btn btn-md bg-primary w-fit" type="submit">
              Thêm
            </button>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default CreateModal
