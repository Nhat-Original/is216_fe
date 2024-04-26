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
  auth: boolean
  user: User
  login: () => void
  logout: () => void
}
export type Auth = {
  token: string
  setToken: (token: string) => void
}
export const userSessionStore = create<StateUser>((set) => ({
  auth: false,
  user: {
    id: '',
    role: '',
  },
  login: () => {
    const token = (useTokenStore.getState() as any).token
    console.log(token)
    if (token !== '') {
      const decoded = jwtDecode<jwtPayLoadWithRole>(token)
      set({
        auth: true,
        user: {
          id: decoded.sub as string,
          role: decoded.role as string,
        },
      })
    }
  },
  logout: () => {
    useTokenStore.persist.clearStorage()
    useTokenStore.setState({ token: '' })
    set({ auth: false, user: { id: '', role: '' } })
  },
}))
export const useTokenStore = create(
  persist((set) => ({ token: '', setToken: (token: string) => set({ token }) }), { name: 'token-storage' }),
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

//usage
// import { authStore, userSessionStore } from '@/lib/store'
// const AuthStore = createSelectors(authStore)
// const UserSessionStore = createSelectors(userSessionStore)
// const useAuth = AuthStore.use
// const useUserSession = UserSessionStore.use
