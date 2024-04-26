import { ReactNode } from 'react'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
        <main className="min-h-[calc(100vh-75px)]">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default AuthLayout
