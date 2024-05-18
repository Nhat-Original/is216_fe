import { create } from 'zustand'

type MenuItem = {
  id: string
  name: string
  description: string
  imageUrl: string
}

type MenuItemOption = {
  id: string
  size: string
  price: number
}

type Review = {
  id: string
  rating: number
  comment: string
  user: {
    id: string
    fullName: string
  }
}

type Eatery = {
  id: string
  name: string
}

type Data = MenuItem & {
  menuItemOptions: MenuItemOption[]
  reviews: Review[]
  eatery: Eatery
}

type State = {
  isLoading: boolean
  menuItem: MenuItem | null
  eatery: Eatery | null
  menuItemOptions: MenuItemOption[]
  reviews: Review[]
  averageRating: number
  numberOfReviews: number
  currentMenuItemOption: MenuItemOption | null

  setIsLoading: (isLoading: boolean) => void
  setMenuItem: (menuItem: MenuItem) => void
  setEatery: (eatery: Eatery) => void
  setMenuItemOptions: (menuItemOptions: MenuItemOption[]) => void
  setReviews: (reviews: Review[]) => void
  setCurrentMenuItemOption: (currentMenuItemOption: MenuItemOption) => void
}

const useFoodDetailStore = create<State>((set) => ({
  isLoading: false,
  menuItem: null,
  eatery: null,
  menuItemOptions: [],
  reviews: [],
  averageRating: 0,
  numberOfReviews: 0,
  currentMenuItemOption: null,

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading })
  },
  setMenuItem: (menuItem: MenuItem) => {
    set({ menuItem })
  },
  setEatery: (eatery: Eatery) => {
    set({ eatery })
  },
  setMenuItemOptions: (menuItemOptions: MenuItemOption[]) => {
    set({ menuItemOptions })
  },
  setReviews: (reviews: Review[]) => {
    set({
      reviews,
      averageRating: Math.round((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) * 2) / 2,
      numberOfReviews: reviews.length,
    })
  },
  setCurrentMenuItemOption: (currentMenuItemOption: MenuItemOption) => {
    set({ currentMenuItemOption })
  },
}))

export type { Data, State }
export default useFoodDetailStore
