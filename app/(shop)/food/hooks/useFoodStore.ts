import { create } from 'zustand'

type State = {
  // item per slide
  itemsPerSlide: number
  // slide
  activeSlide: number
  setActiveSlide: (activeSlide: number) => void
  increaseActiveSlide: () => void
  decreaseActiveSlide: () => void
  // original food list
  originalFoodList: any[]
  setOriginalFoodList: (originalFoodList: any[]) => void
  // shown food list
  shownFoodList: any[]
  setShownFoodListByActiveSlide: (activeSlide: number) => void
}

const useFoodStore = create<State>((set) => ({
  // item per slide
  itemsPerSlide: 16,
  // slide
  activeSlide: 0,
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
  // original food list
  originalFoodList: [],
  setOriginalFoodList: (originalFoodList) => {
    set({ originalFoodList })
  },
  // shown food list
  shownFoodList: [],
  setShownFoodListByActiveSlide: (activeSlide: number) => {
    const itemsPerSlide = useFoodStore.getState().itemsPerSlide
    const originalFoodList = useFoodStore.getState().originalFoodList
    const shownFoodList = originalFoodList.slice(
      activeSlide * itemsPerSlide,
      activeSlide * itemsPerSlide + itemsPerSlide,
    )
    set({ shownFoodList })
  },
}))

export type { State }
export default useFoodStore
