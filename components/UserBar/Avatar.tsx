'use client'
import { useSessionStore } from '@/stores/useSessionStore'
import { useRouter } from 'next/navigation'
import { api } from '@/api/api'
import { useUserStateStore } from '@/stores/useUserStateStore'
import { useEffect } from 'react'
import { useStore } from 'zustand'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useShallow } from 'zustand/react/shallow'
import avatarPlaceholder from '@/public/images/avatarPlaceholder.png'

const Avatar = () => {
  const userSession = useStore(useSessionStore, (state) => state)
  const { setUser } = useStore(useUserStateStore, (s) => s)
  const { data, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: () => api.get(`/user/${userSession.user.id}`),
  })
  useEffect(() => {
    if (isSuccess && data.data) {
      setUser(data.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const router = useRouter()
  const [auth, user] = useSessionStore(useShallow((state) => [state.auth, state.user]))

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="User's Avatar" src={avatarPlaceholder.src} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm w-[350px] dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box"
      >
        <ul className="[&>li]:px-3 [&>li]:py-1">
          <li>ID: {auth ? user.id : ''}</li>
        </ul>
        <hr />
        <li>
          <Link href="/settings/user-addresses">Quản lý địa chỉ</Link>
        </li>
        <li
          onClick={() => {
            useSessionStore.getState().logout()
            router.push('/')
          }}
        >
          <div>Đăng xuất</div>
        </li>
      </ul>
    </div>
  )
}

export default Avatar
