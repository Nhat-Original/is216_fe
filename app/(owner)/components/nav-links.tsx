'use client'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import clsx from 'clsx'
const links = [
  {
    name: 'Danh sách sản phẩm',
    href: '',
  },
]
export default function NavLinks() {
  const pathname = usePathname()
  const { id } = useParams<{ id: string }>()
  return (
    <nav className="flex flex-col space-y-2">
      {links.map((link) => (
        <Link
          key={link.name}
          href={`/owner/eatery/${id}${link.href}`}
          className={clsx(
            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
            {
              'bg-sky-100 text-blue-600': pathname === `/owner/eatery/${id}${link.href}`,
            },
          )}
        >
          <p className="hidden md:block">{link.name}</p>
        </Link>
      ))}
    </nav>
  )
}
