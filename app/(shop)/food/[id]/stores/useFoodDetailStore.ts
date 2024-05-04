import { create } from 'zustand'

/*
const dummyData = {
  id: '1f3d3866-d7d0-4da7-a953-59712c14e6b1',
  name: 'food',
  description: 'food description',
  imageUrl:
    'https://www.google.com/imgres?imgurl=https%3A%2F%2Ffood.fnr.sndimg.com%2Fcontent%2Fdam%2Fimages%2Ffood%2Ffullset%2F2016%2F6%2F12%2F3%2FFNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.1280.1280.suffix%2F1465939620872.jpeg&tbnid=F8JeTUT63bXRwM&vet=12ahUKEwjG9fTxs-qFAxWBUPUHHSP4CqUQMygJegQIARB8..i&imgrefurl=https%3A%2F%2Fwww.foodnetwork.com%2Frecipes%2Ffood-network-kitchen%2Fpenne-with-vodka-sauce-and-mini-meatballs-3364941&docid=06Sx5A8hBC1oTM&w=1280&h=1280&q=food&client=firefox-b-d&ved=2ahUKEwjG9fTxs-qFAxWBUPUHHSP4CqUQMygJegQIARB8',
  menuItemOptions: [
    {
      id: '1f3d3866-d7d0-4da7-a953-59712c14e6b2',
      size: 'S',
      price: 1000,
    },
    {
      id: '1f3d3866-d7d0-4da7-a953-59712c14e6b3',
      size: 'M',
      price: 2000,
    },
    {
      id: '1f3d3866-d7d0-4da7-a953-59712c14e6b4',
      size: 'L',
      price: 3000,
    },
  ],
  reviews: [
    {
      id: '1f3d3866-d7d0-4da7-a953-59712c14e6b5',
      rating: 5,
      comment: 'good food',
      user: {
        id: '1f3d3866-d7d0-4da7-a953-59712c14e6b6',
        fullName: 'John Doe',
      },
    },
    {
      id: '1f3d3866-d7d0-4da7-a953-59712c14e6b7',
      rating: 4,
      comment: 'great',
      user: {
        id: '1f3d3866-d7d0-4da7-a953-59712c14e6b8',
        fullName: 'Jane Doe',
      },
    },
  ],
  eatery: {
    id: '1',
    name: 'eatery name',
  },
}
*/

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
