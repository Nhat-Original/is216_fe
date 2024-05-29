'use client'

import { useUserStateStore } from '@/stores/useUserStateStore'
import Link from 'next/link'
import { useStore } from 'zustand'
import { usePathname } from 'next/navigation'
import { useSessionStore } from '@/stores/useSessionStore'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react'
const ListEateries = () => {
  const asPath = usePathname()
  const session = useStore(useSessionStore)
  const router = useRouter()
  const user = useStore(useUserStateStore)
  const { data } = useQuery({
    queryKey: ['eateries', user.id],
    queryFn: async () => {
      const res = await api.get(`/eatery/owner/${user.id}`)
      return res.data
    },
  })

  if (session.auth === false) {
    router.push('/signin')
  }
  if (session.auth === true && session.user.role !== 'ROLE_OWNER') {
    toast.error('Bạn không phải là chủ cửa hàng')
    router.push('/')
  }
  if (data.length === 0) {
    return <p>Bạn chưa có cửa hàng nào</p>
  }
  return (
    <div className="flex justify-center items-center w-full">
      <ul className="mt-8 menu bg-base-200 w-1/3 rounded-box text-center">
        <li className="menu-title text-lg  ">Danh sách cửa hàng</li>
        {data.map(
          (eatery: {
            id: Key | null | undefined
            name:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | PromiseLikeOfReactNode
              | null
              | undefined
            isAlive: any
          }) => (
            <Link href={`${asPath}/eatery/${eatery.id}`} key={eatery.id}>
              <li className="text-base text-center p-4  hover:bg-slate-200">
                {' '}
                {eatery.name}: {eatery.isAlive ? 'Mở' : 'Đóng'}
              </li>
            </Link>
          ),
        )}
      </ul>
    </div>
  )
}
export default ListEateries
