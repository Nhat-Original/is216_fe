'use client'

import { useUserStateStore } from '@/stores/useUserStateStore'
import Link from 'next/link'
import { useStore } from 'zustand'
import { usePathname } from 'next/navigation'
const ListEateries = () => {
  const asPath = usePathname()

  const user = useStore(useUserStateStore)
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
