import { create } from 'zustand'

enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
}

enum DeliveryStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

type Eatery = {
  id: string
  name: string
}

type Order = {
  id: string
  orderDate: string
  totalPrice: number
  note: string
  paymentMethod: PaymentMethod
  deliveryStatus: DeliveryStatus
  eatery: Eatery
}

type State = {
  isLoading: boolean
  orders: Order[]

  setOrders: (orders: Order[]) => void
}

const useOrderHistoryStore = create<State>((set) => ({
  isLoading: false,
  orders: [],

  setOrders: (orders) => set({ orders }),
}))

export { PaymentMethod, DeliveryStatus }
export default useOrderHistoryStore
