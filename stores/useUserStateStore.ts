import { create } from 'zustand'

type UserState = {
  id: string
  fullname: string
  dateOfBirth: string
  email: string
  phone: string
  gender: string
  addresses: string[]
  eateries: eatery[]
  reviews: string[]
  carts: string[]

  setUser: (user: UserState) => void
}
type eatery = {
  id: string
  name: string
  isAlive: boolean
}
export const useUserStateStore = create<UserState>((set) => ({
  id: '',
  fullname: '',
  dateOfBirth: '',
  email: '',
  phone: '',
  gender: '',
  addresses: [],
  eateries: [],
  reviews: [],
  carts: [],

  setUser: (user: UserState) => set(user),
}))
