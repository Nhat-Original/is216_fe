import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import React, { ReactNode } from 'react'
import type { Metadata } from 'next'
import { ToastContainer, Bounce } from 'react-toastify'
import Providers from '@/components/Providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const metadata: Metadata = {
  title: 'FoodHub',
  icons: [
    {
      rel: 'icon',
      href: '/images/favicon.ico',
      url: '',
    },
  ],
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="vi" data-theme="light">
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer
            position="top-right"
            limit={3}
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="colored"
            transition={Bounce}
          />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
export { metadata }
