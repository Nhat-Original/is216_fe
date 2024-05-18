import { create } from 'zustand'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { StoreApi, UseBoundStore } from 'zustand'
import { persist } from 'zustand/middleware'
type User = {
  id: string
  role: string
}
type jwtPayLoadWithRole = JwtPayload & { role: string }
type StateUser = {
  isLoading: boolean
  auth: boolean
  user: User
  login: () => void
  logout: () => void
}
export type Auth = {
  token: string
  setToken: (token: string) => void
}
export const useSessionStore = create<StateUser>((set) => ({
  isLoading: true,
  auth: false,
  user: {
    id: '',
    role: '',
  },
  login: () => {
    const token = (useTokenStore.getState() as any).token
    console.log('token', token)
    if (token !== '') {
      const decoded = jwtDecode<jwtPayLoadWithRole>(token)
      set({
        isLoading: false,
        auth: true,
        user: {
          id: decoded.sub as string,
          role: decoded.role as string,
        },
      })
    }
    set({ isLoading: false })
  },
  logout: () => {
    useTokenStore.persist.clearStorage()
    useTokenStore.setState({ token: '' })
    set({ isLoading: false, auth: false, user: { id: '', role: '' } })
  },
}))

export const useTokenStore = create(
  persist(
    (set) => ({
      token: '',
      setToken: (token: string) => set({ token }),
    }),
    {
      name: 'token-storage',
    },
  ),
)

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never
type State = object
export const createSelectors = <S extends UseBoundStore<StoreApi<State>>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}
