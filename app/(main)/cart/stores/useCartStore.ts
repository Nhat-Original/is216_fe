import { create } from 'zustand'

type CartItem = {
  menuItemOptionId: string
  imageUrl: string
  name: string
  size: string
  price: number
  quantity: number
  eatery: {
    id: string
    name: string
  }
}

type State = {
  cartItems: CartItem[]
  selectedCartItems: CartItem[]
  errorMessages: Record<string, string[] | undefined>

  setCartItems: (cartItems: CartItem[]) => void
  setSelectedCartItems: (selectedCartItems: CartItem[]) => void
  setErrorMessages: (errorMessages: Record<string, string[] | undefined>) => void
}

const useCartStore = create<State>((set) => ({
  cartItems: [],
  selectedCartItems: [],
  errorMessages: {},

  setCartItems: (cartItems) => set({ cartItems: cartItems }),
  setSelectedCartItems: (selectedCartItems) => set({ selectedCartItems }),
  setErrorMessages: (errorMessages) => set({ errorMessages }),
}))

export default useCartStore
export type { CartItem }
