import { ReactNode } from 'react'
import Head from 'next/head'
import { Footer } from '@/components/global/Footer'
import Navbar from '@/components/navbar'
type LayoutProps = {
  children: ReactNode
}

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Authentication</title>
      </Head>
      <div className="flex flex-col">
        <Navbar />
        <main className="min-h-[calc(100vh-100px)]">{children}</main>
        <div className="divider"></div>
        <Footer />
      </div>
    </>
  )
}

export default AuthLayout
