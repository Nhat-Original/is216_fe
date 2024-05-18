'use client'

import { useUserStateStore } from '@/stores/useUserStateStore'
import Link from 'next/link'
import { useStore } from 'zustand'
const ListEateries = () => {
  //   const userSession = useStore(useSessionStore, (state) => state)
  //   console.log(userSession)
  //   const { data, isFetching, isLoading } = useQuery({
  //     queryKey: ['user'],
  //     queryFn: () => api.get(`/user/${userSession.user.id}`),
  //   })
  //   console.log(window)
  //   console.log(data, 'client')

  const user = useStore(useUserStateStore)

  return (
    // <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    //   <div className="w-full flex-none md:w-64">
    //     <SideNav />
    //   </div>
    //   <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    // </div>
    <div>
      <h1>Danh sách cửa hàng</h1>
      <ul>
        {user.eateries.map((eatery) => (
          <Link href={`/eatery/${eatery.id}`} key={eatery.id}>
            <li>{eatery.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
export default ListEateries
