import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import React, { ReactNode } from 'react'
import type { Metadata } from 'next'
import { ToastContainer, Bounce } from 'react-toastify'
import Providers from '@/components/providers'

const metadata: Metadata = {
  title: 'IS216 - Next.js',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="vi" data-theme="light">
      <head>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body>
        <Providers>
          {children}

          <ToastContainer
            position="bottom-right"
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
