'use client'

import { useUserStateStore } from '@/stores/useUserStateStore'
import Link from 'next/link'
import { useStore } from 'zustand'
import { usePathname } from 'next/navigation'
const ListEateries = () => {
  const asPath = usePathname()
  //   const userSession = useStore(useSessionStore, (state) => state)
  //   console.log(userSession)
  //   const { data, isFetching, isLoading } = useQuery({
  //     queryKey: ['user'],
  //     queryFn: () => api.get(`/user/${userSession.user.id}`),
  //   })
  //   console.log(window)
  //   console.log(data, 'client')

  const user = useStore(useUserStateStore)
  console.log(user.eateries, 'client')
  return (
    <div className="flex justify-center items-center">
      <ul className="menu bg-base-200 w-56 rounded-box">
        <li className="menu-title">Danh sách cửa hàng</li>
        {user.eateries.map((eatery) => (
          <li key={eatery.id}>
            <Link href={`${asPath}/eatery/${eatery.id}`}>
              {eatery.name}: {eatery.isAlive ? 'Mở' : 'Đóng'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ListEateries
