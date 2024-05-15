import { create } from 'zustand'

type State = {
  itemsPerSlide: number
  activeSlide: number
  originalFoodList: any[]
  shownFoodList: any[]
  nameSearch: string

  setActiveSlide: (activeSlide: number) => void
  increaseActiveSlide: () => void
  decreaseActiveSlide: () => void
  setOriginalFoodList: (originalFoodList: any[]) => void
  setShownFoodListByActiveSlide: (activeSlide: number) => void
  setNameSearch: (nameSearch: string) => void
}

const useFoodStore = create<State>((set) => ({
  itemsPerSlide: 12,
  activeSlide: 0,
  originalFoodList: [],
  shownFoodList: [],
  nameSearch: '',

  setActiveSlide: (activeSlide: number) => {
    const setShownFoodListByActiveSlide = useFoodStore.getState().setShownFoodListByActiveSlide
    set({ activeSlide })
    setShownFoodListByActiveSlide(activeSlide)
  },
  increaseActiveSlide: () => {
    const setShownFoodListByActiveSlide = useFoodStore.getState().setShownFoodListByActiveSlide
    set((state) => ({ activeSlide: state.activeSlide + 1 }))
    setShownFoodListByActiveSlide(useFoodStore.getState().activeSlide)
  },
  decreaseActiveSlide: () => {
    const setShownFoodListByActiveSlide = useFoodStore.getState().setShownFoodListByActiveSlide
    set((state) => ({ activeSlide: state.activeSlide - 1 }))
    setShownFoodListByActiveSlide(useFoodStore.getState().activeSlide)
  },
  setOriginalFoodList: (originalFoodList: any[]) => {
    set({ originalFoodList })
  },
  setShownFoodListByActiveSlide: (activeSlide: number) => {
    const itemsPerSlide = useFoodStore.getState().itemsPerSlide
    const originalFoodList = useFoodStore.getState().originalFoodList
    const shownFoodList = originalFoodList.slice(
      activeSlide * itemsPerSlide,
      activeSlide * itemsPerSlide + itemsPerSlide,
    )
    set({ shownFoodList })
  },
  setNameSearch: (nameSearch: string) => {
    if (!nameSearch) {
      set({ nameSearch: '' })
    } else set({ nameSearch })
  },
}))

export type { State }
export default useFoodStore
