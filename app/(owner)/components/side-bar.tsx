import Link from 'next/link'
import NavLinks from './nav-links'
export default function SideNav() {
  return (
    <div className="flex flex-col h-full p-6 bg-white border-r border-gray-200">
      <h1 className="text-2xl font-semibold text-primary">Owner</h1>
      <NavLinks />
      <Link href={'/'} className="text-gray-700">
        Đăng xuất
      </Link>
    </div>
  )
}
