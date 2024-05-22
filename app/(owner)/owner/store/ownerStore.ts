import { create } from 'zustand'
export type Owner = {
  name: string
  menu_id: string
  setEatery: (owner: Owner) => void
}
export const EateryStore = create<Owner>((set) => ({
  name: '',
  menu_id: '',
  setEatery: (owner) => set({ ...owner }),
}))
