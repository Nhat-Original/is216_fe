import Navbar from '@/components/Navbar'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />

      {children}
    </>
  )
}

export default Layout
