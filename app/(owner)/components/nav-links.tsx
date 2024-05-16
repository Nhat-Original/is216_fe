'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const links = [
  {
    name: 'Danh sách sản phẩm',
    href: '/owner/products',
  },
  {
    name: 'Doanh thu',
    href: '/owner/revenue',
  },
  {
    name: 'Nhận xét',
    href: '/owner/reviews',
  },
]
export default function NavLinks() {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col space-y-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${pathname === link.href ? 'text-primary' : 'text-gray-700'}`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  )
}
