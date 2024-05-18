import { create } from 'zustand'

type CartItem = {
  menuItemOptionId: string
  eateryId: string
  imageUrl: string
  name: string
  size: string
  price: number
  quantity: number
}

type State = {
  cartItems: CartItem[]

  setCartItems: (cartItems: CartItem[]) => void
}

const useCartStore = create<State>((set) => ({
  cartItems: [],

  setCartItems: (cartItems) => set({ cartItems: cartItems }),
}))

export default useCartStore
export type { CartItem }
