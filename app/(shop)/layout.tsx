import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <main className="min-h-[calc(100vh-75px)]">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
