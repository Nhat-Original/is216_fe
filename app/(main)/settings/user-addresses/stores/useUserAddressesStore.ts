import { create } from 'zustand'

type Address = {
  id: string
  province: string
  district: string
  ward: string
  detail: string
}

type Province = {
  province_id: string
  province_name: string
  province_type: string
}

type District = {
  district_id: string
  district_name: string
  district_type: string
  province_id: string
}

type Ward = {
  ward_id: string
  ward_name: string
  ward_type: string
  district_id: string
}

type State = {
  isLoading: boolean
  addresses: Address[]
  fetchedProvinces: Province[]
  fetchedDistricts: District[]
  fetchedWards: Ward[]
  currentProvinceId: string
  currentDistrictId: string
  errorMessages: Record<string, string[] | undefined>

  setAddresses: (addresses: Address[]) => void
  setFetchedProvinces: (provinces: Province[]) => void
  setFetchedDistricts: (districts: District[]) => void
  setFetchedWards: (wards: Ward[]) => void
  setCurrentProvinceId: (provinceId: string) => void
  setCurrentDistrictId: (districtId: string) => void
  setErrorMessages: (errorMessages: Record<string, string[] | undefined>) => void
}

const useUserAdressesStore = create<State>((set) => ({
  isLoading: false,
  addresses: [],
  fetchedProvinces: [],
  fetchedDistricts: [],
  fetchedWards: [],
  currentProvinceId: '',
  currentDistrictId: '',
  errorMessages: {},

  setAddresses: (addresses) => set({ addresses }),
  setFetchedDistricts: (districts) => set({ fetchedDistricts: districts }),
  setFetchedProvinces: (provinces) => set({ fetchedProvinces: provinces }),
  setFetchedWards: (wards) => set({ fetchedWards: wards }),
  setCurrentProvinceId: (provinceId) => set({ currentProvinceId: provinceId }),
  setCurrentDistrictId: (districtId) => set({ currentDistrictId: districtId }),
  setErrorMessages: (errorMessages) => set({ errorMessages }),
}))

export default useUserAdressesStore
