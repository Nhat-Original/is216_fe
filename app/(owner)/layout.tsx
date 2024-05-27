import { ReactNode } from 'react'
type LayoutProps = {
  children: ReactNode
}

const BaseLayout = ({ children }: LayoutProps) => {
  return <main className="min-h-[calc(100vh-301px)] px-2 sm:px-6 md:px-12 lg:px-16 xl:px-24">{children}</main>
}
export default BaseLayout
